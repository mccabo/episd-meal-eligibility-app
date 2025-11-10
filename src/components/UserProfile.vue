<template>
  <div class="user-profile" v-if="isAuthenticated">
    <Card style="max-width: 400px; margin: 20px auto;">
      <template #header>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <Avatar :label="initials" size="xlarge" shape="circle" style="background-color: rgba(255,255,255,0.3); color: white; font-size: 2rem;" />
          <h2 style="margin: 10px 0 5px 0;">{{ currentUser.displayName }}</h2>
          <Tag :value="currentUser.role.toUpperCase()" :severity="getRoleSeverity(currentUser.role)" />
        </div>
      </template>
      <template #content>
        <div class="user-details">
          <div class="detail-item">
            <strong>Email:</strong> {{ currentUser.email }}
          </div>
          <div class="detail-item">
            <strong>Username:</strong> {{ currentUser.username }}
          </div>
          <div class="detail-item">
            <strong>User ID:</strong> {{ currentUser.id }}
          </div>
          
          <Divider />
          
          <h3>Permissions</h3>
          <div class="permissions-grid">
            <div v-for="(value, key) in currentUser.permissions" :key="key" class="permission-item">
              <i :class="value ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500'" style="margin-right: 8px;"></i>
              <span>{{ formatPermissionName(key) }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <Button label="Logout" icon="pi pi-sign-out" class="w-full" severity="danger" @click="handleLogout" />
      </template>
    </Card>
  </div>
  <div v-else class="text-center p-4">
    <Message severity="warn">Please log in to view your profile.</Message>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useLocalAuth from '@/composables/useLocalAuth';

export default {
  name: 'UserProfile',
  setup() {
    const router = useRouter();
    const { currentUser, isAuthenticated, logout } = useLocalAuth();

    const initials = computed(() => {
      if (!currentUser.value || !currentUser.value.displayName) return '?';
      return currentUser.value.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    });

    const getRoleSeverity = (role) => {
      const severityMap = {
        admin: 'danger',
        developer: 'warning',
        user: 'info'
      };
      return severityMap[role] || 'info';
    };

    const formatPermissionName = (key) => {
      // Convert camelCase to Title Case with spaces
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
    };

    const handleLogout = () => {
      logout();
      router.push({ name: 'Login' });
    };

    return {
      currentUser,
      isAuthenticated,
      initials,
      getRoleSeverity,
      formatPermissionName,
      handleLogout
    };
  }
};
</script>

<style scoped>
.user-profile {
  padding: 20px;
}

.user-details {
  font-size: 14px;
}

.detail-item {
  margin-bottom: 12px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.permissions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 10px;
}

.permission-item {
  display: flex;
  align-items: center;
  padding: 6px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 13px;
}

.text-green-500 {
  color: #22c55e;
}

.text-red-500 {
  color: #ef4444;
}
</style>

