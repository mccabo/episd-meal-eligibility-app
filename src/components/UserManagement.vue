<template>
  <div class="user-management">
    <Card>
      <template #header>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white;">
          <h2 style="margin: 0;">
            <i class="pi pi-users"></i> User Management
          </h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">View all registered users</p>
        </div>
      </template>
      <template #content>
        <div v-if="!hasPermission('canManageUsers')" class="no-permission">
          <Message severity="error">
            <strong>Access Denied:</strong> You don't have permission to manage users.
            This feature is only available to administrators.
          </Message>
        </div>

        <div v-else>
          <div class="user-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <Card class="stat-card">
              <template #content>
                <div style="text-align: center;">
                  <i class="pi pi-users" style="font-size: 2rem; color: #667eea;"></i>
                  <h3 style="margin: 10px 0 5px 0;">{{ totalUsers }}</h3>
                  <p style="margin: 0; color: #666;">Total Users</p>
                </div>
              </template>
            </Card>
            <Card class="stat-card">
              <template #content>
                <div style="text-align: center;">
                  <i class="pi pi-database" style="font-size: 2rem; color: #10b981;"></i>
                  <h3 style="margin: 10px 0 5px 0;">{{ jsonUsers }}</h3>
                  <p style="margin: 0; color: #666;">In users.json</p>
                </div>
              </template>
            </Card>
            <Card class="stat-card">
              <template #content>
                <div style="text-align: center;">
                  <i class="pi pi-user-plus" style="font-size: 2rem; color: #f59e0b;"></i>
                  <h3 style="margin: 10px 0 5px 0;">{{ customUsers }}</h3>
                  <p style="margin: 0; color: #666;">In localStorage</p>
                </div>
              </template>
            </Card>
          </div>

          <Divider />

          <div v-if="loading" class="text-center p-4">
            <ProgressSpinner />
          </div>

          <div v-else>
            <DataTable 
              :value="allUsers" 
              :paginator="true" 
              :rows="10" 
              :rowsPerPageOptions="[5, 10, 20, 50]"
              responsiveLayout="scroll"
              filterDisplay="row"
              v-model:filters="filters"
              :globalFilterFields="['displayName', 'email', 'username', 'role']"
            >
              <template #header>
                <div style="text-align: left">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search users..." style="width: 100%; max-width: 300px;" />
                  </span>
                </div>
              </template>
              
              <Column field="id" header="ID" :sortable="true" style="width: 80px;">
                <template #body="{ data }">
                  <Tag :value="data.id" severity="info" />
                </template>
              </Column>
              
              <Column field="displayName" header="Display Name" :sortable="true">
                <template #body="{ data }">
                  <strong>{{ data.displayName }}</strong>
                </template>
              </Column>
              
              <Column field="username" header="Username" :sortable="true" />
              
              <Column field="email" header="Email" :sortable="true" />
              
              <Column field="role" header="Role" :sortable="true" style="width: 150px;">
                <template #body="{ data }">
                  <Tag 
                    :value="data.role.toUpperCase()" 
                    :severity="getRoleSeverity(data.role)" 
                  />
                </template>
              </Column>
              
              <Column header="Source" style="width: 120px;">
                <template #body="{ data }">
                  <Tag 
                    :value="data.source" 
                    :severity="data.source === 'JSON' ? 'success' : 'warning'" 
                    :icon="data.source === 'JSON' ? 'pi pi-database' : 'pi pi-user-plus'"
                  />
                </template>
              </Column>
              
              <Column header="Permissions" style="width: 150px;">
                <template #body="{ data }">
                  <Button 
                    label="View" 
                    icon="pi pi-eye" 
                    size="small" 
                    @click="viewUserPermissions(data)"
                    severity="info"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
    </Card>

    <!-- User Permissions Dialog -->
    <Dialog 
      v-model:visible="permissionsDialog" 
      :header="selectedUser ? selectedUser.displayName + '\'s Permissions' : 'User Permissions'" 
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div v-if="selectedUser" class="user-permissions-dialog">
        <div class="user-info" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Username:</strong> {{ selectedUser.username }}</p>
          <p><strong>Role:</strong> <Tag :value="selectedUser.role.toUpperCase()" :severity="getRoleSeverity(selectedUser.role)" /></p>
        </div>
        
        <h4>Permissions:</h4>
        <div class="permissions-list">
          <div v-for="(value, key) in selectedUser.permissions" :key="key" class="permission-item">
            <i :class="value ? 'pi pi-check-circle text-green' : 'pi pi-times-circle text-red'" style="margin-right: 10px;"></i>
            <span>{{ formatPermissionName(key) }}</span>
          </div>
        </div>
      </div>
    </Dialog>

    <Toast />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import useLocalAuth from '@/composables/useLocalAuth';
import API_BASE_URL from '@/config/api';

export default {
  name: 'UserManagement',
  setup() {
    const { hasPermission } = useLocalAuth();
    const allUsers = ref([]);
    const loading = ref(true);
    const totalUsers = ref(0);
    const jsonUsers = ref(0);
    const customUsers = ref(0);
    const permissionsDialog = ref(false);
    const selectedUser = ref(null);

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const loadAllUsers = async () => {
      loading.value = true;
      try {
        // Try to load from server first (users.json via API)
        try {
          const serverResponse = await fetch(`${API_BASE_URL}/users`);
          if (serverResponse.ok) {
            const serverData = await serverResponse.json();
            const usersFromServer = serverData.users.map(u => ({ ...u, source: 'Server' }));
            
            // Also check localStorage for any users added when server was down
            const customUsersJson = localStorage.getItem('customUsers');
            const usersFromStorage = customUsersJson 
              ? JSON.parse(customUsersJson).map(u => ({ ...u, source: 'localStorage' }))
              : [];

            allUsers.value = [...usersFromServer, ...usersFromStorage];
            totalUsers.value = allUsers.value.length;
            jsonUsers.value = usersFromServer.length;
            customUsers.value = usersFromStorage.length;
            
            console.log('✓ Loaded users from server:', jsonUsers.value, 'server,', customUsers.value, 'localStorage');
            loading.value = false;
            return;
          }
        } catch (serverError) {
          console.warn('⚠ Server unavailable, loading from local files:', serverError.message);
        }

        // Fallback: Load users from JSON file directly
        const response = await fetch('/users.json');
        const data = await response.json();
        const usersFromJson = data.users.map(u => ({ ...u, source: 'JSON' }));
        
        // Load custom users from localStorage
        const customUsersJson = localStorage.getItem('customUsers');
        const usersFromStorage = customUsersJson 
          ? JSON.parse(customUsersJson).map(u => ({ ...u, source: 'localStorage' }))
          : [];

        allUsers.value = [...usersFromJson, ...usersFromStorage];
        totalUsers.value = allUsers.value.length;
        jsonUsers.value = usersFromJson.length;
        customUsers.value = usersFromStorage.length;
        
        console.log('✓ Loaded users from local files:', jsonUsers.value, 'JSON,', customUsers.value, 'localStorage');
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        loading.value = false;
      }
    };

    const getRoleSeverity = (role) => {
      const severityMap = {
        admin: 'danger',
        developer: 'warning',
        user: 'info'
      };
      return severityMap[role] || 'info';
    };

    const formatPermissionName = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
    };

    const viewUserPermissions = (user) => {
      selectedUser.value = user;
      permissionsDialog.value = true;
    };

    onMounted(() => {
      loadAllUsers();
    });

    return {
      allUsers,
      loading,
      totalUsers,
      jsonUsers,
      customUsers,
      filters,
      permissionsDialog,
      selectedUser,
      hasPermission,
      getRoleSeverity,
      formatPermissionName,
      viewUserPermissions
    };
  }
};
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.no-permission {
  padding: 20px;
  text-align: center;
}

.stat-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.permissions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.permission-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}

.text-green {
  color: #22c55e;
}

.text-red {
  color: #ef4444;
}

.user-info p {
  margin: 8px 0;
}
</style>

