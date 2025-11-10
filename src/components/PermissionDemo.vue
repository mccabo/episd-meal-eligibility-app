<template>
  <div class="permission-demo">
    <h2>Permission-Based Features Demo</h2>
    <p>This component demonstrates how different features are enabled/disabled based on user permissions.</p>

    <div class="demo-grid">
      <!-- Create Permission -->
      <Card>
        <template #title>
          <i class="pi pi-plus-circle"></i> Create
        </template>
        <template #content>
          <p>Create new records or items</p>
          <Button 
            label="Create New Item" 
            icon="pi pi-plus"
            :disabled="!hasPermission('canCreate')"
            @click="showMessage('Create')"
            class="w-full"
          />
          <small v-if="!hasPermission('canCreate')" class="text-red-500 block mt-2">
            ❌ You don't have permission to create
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can create items
          </small>
        </template>
      </Card>

      <!-- Read Permission -->
      <Card>
        <template #title>
          <i class="pi pi-eye"></i> Read
        </template>
        <template #content>
          <p>View records and data</p>
          <Button 
            label="View Data" 
            icon="pi pi-eye"
            :disabled="!hasPermission('canRead')"
            @click="showMessage('Read')"
            class="w-full"
          />
          <small v-if="!hasPermission('canRead')" class="text-red-500 block mt-2">
            ❌ You don't have permission to read
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can view data
          </small>
        </template>
      </Card>

      <!-- Update Permission -->
      <Card>
        <template #title>
          <i class="pi pi-pencil"></i> Update
        </template>
        <template #content>
          <p>Edit existing records</p>
          <Button 
            label="Edit Item" 
            icon="pi pi-pencil"
            :disabled="!hasPermission('canUpdate')"
            @click="showMessage('Update')"
            class="w-full"
            severity="warning"
          />
          <small v-if="!hasPermission('canUpdate')" class="text-red-500 block mt-2">
            ❌ You don't have permission to update
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can edit items
          </small>
        </template>
      </Card>

      <!-- Delete Permission -->
      <Card>
        <template #title>
          <i class="pi pi-trash"></i> Delete
        </template>
        <template #content>
          <p>Remove records permanently</p>
          <Button 
            label="Delete Item" 
            icon="pi pi-trash"
            :disabled="!hasPermission('canDelete')"
            @click="showMessage('Delete')"
            class="w-full"
            severity="danger"
          />
          <small v-if="!hasPermission('canDelete')" class="text-red-500 block mt-2">
            ❌ You don't have permission to delete
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can delete items
          </small>
        </template>
      </Card>

      <!-- Manage Users Permission -->
      <Card>
        <template #title>
          <i class="pi pi-users"></i> Manage Users
        </template>
        <template #content>
          <p>Create, edit, and delete users</p>
          <Button 
            label="User Management" 
            icon="pi pi-users"
            :disabled="!hasPermission('canManageUsers')"
            @click="showMessage('Manage Users')"
            class="w-full"
            severity="help"
          />
          <small v-if="!hasPermission('canManageUsers')" class="text-red-500 block mt-2">
            ❌ Admin only feature
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can manage users
          </small>
        </template>
      </Card>

      <!-- Access Reports Permission -->
      <Card>
        <template #title>
          <i class="pi pi-chart-bar"></i> Reports
        </template>
        <template #content>
          <p>View analytics and reports</p>
          <Button 
            label="View Reports" 
            icon="pi pi-chart-bar"
            :disabled="!hasPermission('canAccessReports')"
            @click="showMessage('Access Reports')"
            class="w-full"
            severity="info"
          />
          <small v-if="!hasPermission('canAccessReports')" class="text-red-500 block mt-2">
            ❌ You don't have access to reports
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can view reports
          </small>
        </template>
      </Card>

      <!-- Configure System Permission -->
      <Card>
        <template #title>
          <i class="pi pi-cog"></i> System Config
        </template>
        <template #content>
          <p>Configure system settings</p>
          <Button 
            label="System Settings" 
            icon="pi pi-cog"
            :disabled="!hasPermission('canConfigureSystem')"
            @click="showMessage('Configure System')"
            class="w-full"
            severity="secondary"
          />
          <small v-if="!hasPermission('canConfigureSystem')" class="text-red-500 block mt-2">
            ❌ You don't have configuration access
          </small>
          <small v-else class="text-green-500 block mt-2">
            ✅ You can configure system
          </small>
        </template>
      </Card>

      <!-- Role-based display -->
      <Card>
        <template #title>
          <i class="pi pi-shield"></i> Role Check
        </template>
        <template #content>
          <p>Your current role: <Tag :value="currentUser?.role || 'None'" :severity="getRoleSeverity()" /></p>
          <div class="role-checks">
            <div class="role-check-item">
              <i :class="isAdmin ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
              <span>Admin Access</span>
            </div>
            <div class="role-check-item">
              <i :class="isDeveloper ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
              <span>Developer Access</span>
            </div>
            <div class="role-check-item">
              <i :class="isUser ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'"></i>
              <span>User Access</span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <Toast />
  </div>
</template>

<script>
import { useToast } from 'primevue/usetoast';
import useLocalAuth from '@/composables/useLocalAuth';

export default {
  name: 'PermissionDemo',
  setup() {
    const toast = useToast();
    const { 
      currentUser, 
      hasPermission, 
      isAdmin, 
      isDeveloper, 
      isUser 
    } = useLocalAuth();

    const showMessage = (action) => {
      toast.add({
        severity: 'success',
        summary: 'Action Authorized',
        detail: `You successfully performed: ${action}`,
        life: 3000
      });
    };

    const getRoleSeverity = () => {
      if (!currentUser.value) return 'info';
      const role = currentUser.value.role;
      const severityMap = {
        admin: 'danger',
        developer: 'warning',
        user: 'info'
      };
      return severityMap[role] || 'info';
    };

    return {
      currentUser,
      hasPermission,
      isAdmin,
      isDeveloper,
      isUser,
      showMessage,
      getRoleSeverity
    };
  }
};
</script>

<style scoped>
.permission-demo {
  padding: 20px;
}

.permission-demo h2 {
  margin-bottom: 10px;
}

.permission-demo p {
  color: #666;
  margin-bottom: 20px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.role-checks {
  margin-top: 15px;
}

.role-check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  margin: 5px 0;
  background: #f8f9fa;
  border-radius: 4px;
}

.text-green-500 {
  color: #22c55e;
}

.text-red-500 {
  color: #ef4444;
}
</style>

