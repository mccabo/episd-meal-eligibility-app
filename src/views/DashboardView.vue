<template>
  <div class="dashboard-container" style="padding: 20px; background-color: #f5f5f5; min-height: 100vh;">
    <Toast />
    
    <!-- Header -->
    <div class="dashboard-header" style="margin-bottom: 30px;">
      <h1 style="font-size: 32px; font-weight: 700; color: #333; margin-bottom: 10px;">
        Applications Dashboard
      </h1>
      <p style="color: #666; font-size: 16px;">Overview and analytics for meal applications</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container" style="text-align: center; padding: 50px;">
      <ProgressSpinner />
      <p style="margin-top: 20px; color: #666;">Loading applications data...</p>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Summary Cards -->
      <div class="summary-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Total Applications Card -->
        <div class="summary-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Total Applications</p>
              <h2 style="font-size: 36px; font-weight: 700; margin: 0;">{{ totalApplications }}</h2>
            </div>
            <i class="pi pi-file" style="font-size: 48px; opacity: 0.3;"></i>
          </div>
        </div>

        <!-- Approved Free Meals Card -->
        <div class="summary-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Approved - Free</p>
              <h2 style="font-size: 36px; font-weight: 700; margin: 0;">{{ approvedFreeCount }}</h2>
              <p style="font-size: 12px; opacity: 0.8; margin-top: 5px;">{{ approvedFreePercentage }}%</p>
            </div>
            <i class="pi pi-check-circle" style="font-size: 48px; opacity: 0.3;"></i>
          </div>
        </div>

        <!-- Approved Reduced Card -->
        <div class="summary-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Approved - Reduced</p>
              <h2 style="font-size: 36px; font-weight: 700; margin: 0;">{{ approvedReducedCount }}</h2>
              <p style="font-size: 12px; opacity: 0.8; margin-top: 5px;">{{ approvedReducedPercentage }}%</p>
            </div>
            <i class="pi pi-check" style="font-size: 48px; opacity: 0.3;"></i>
          </div>
        </div>

        <!-- Denied Applications Card -->
        <div class="summary-card" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Denied</p>
              <h2 style="font-size: 36px; font-weight: 700; margin: 0;">{{ deniedCount }}</h2>
              <p style="font-size: 12px; opacity: 0.8; margin-top: 5px;">{{ deniedPercentage }}%</p>
            </div>
            <i class="pi pi-times-circle" style="font-size: 48px; opacity: 0.3;"></i>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Status Distribution Chart -->
        <div class="chart-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; margin-bottom: 20px; color: #333; font-size: 18px; font-weight: 600;">
            Status Distribution
          </h3>
          <Chart type="pie" :data="statusChartData" :options="chartOptions" style="height: 300px;" />
        </div>

        <!-- Language Distribution Chart -->
        <div class="chart-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; margin-bottom: 20px; color: #333; font-size: 18px; font-weight: 600;">
            Language Distribution
          </h3>
          <Chart type="doughnut" :data="languageChartData" :options="chartOptions" style="height: 300px;" />
        </div>
      </div>

      <!-- Batch Analysis -->
      <div class="batch-section" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 30px;">
        <h3 style="margin-top: 0; margin-bottom: 20px; color: #333; font-size: 18px; font-weight: 600;">
          Applications by Batch
        </h3>
        <Chart type="bar" :data="batchChartData" :options="batchChartOptions" style="height: 300px;" />
      </div>

      <!-- Detailed Statistics -->
      <div class="statistics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Students Statistics -->
        <div class="stat-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h4 style="margin-top: 0; color: #333; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
            <i class="pi pi-users" style="margin-right: 8px; color: #667eea;"></i>
            Students Statistics
          </h4>
          <div style="color: #666;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span>Total Students:</span>
              <strong style="color: #333;">{{ totalStudents }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span>Avg per Application:</span>
              <strong style="color: #333;">{{ avgStudentsPerApp }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span>Unique Campuses:</span>
              <strong style="color: #333;">{{ uniqueCampuses }}</strong>
            </div>
          </div>
        </div>

        <!-- Status Breakdown -->
        <div class="stat-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h4 style="margin-top: 0; color: #333; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
            <i class="pi pi-chart-pie" style="margin-right: 8px; color: #667eea;"></i>
            Processing Status
          </h4>
          <div style="color: #666;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span>Printed:</span>
              <strong style="color: #10b981;">{{ printedCount }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span>Sent:</span>
              <strong style="color: #3b82f6;">{{ sentCount }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0;">
              <span>Selected:</span>
              <strong style="color: #f59e0b;">{{ selectedCount }}</strong>
            </div>
          </div>
        </div>

        <!-- Top Campuses -->
        <div class="stat-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h4 style="margin-top: 0; color: #333; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
            <i class="pi pi-building" style="margin-right: 8px; color: #667eea;"></i>
            Top Campuses
          </h4>
          <div style="color: #666;">
            <div v-for="(campus, index) in topCampuses" :key="index" 
                 style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span style="font-size: 13px;">{{ campus.name }}</span>
              <strong style="color: #333;">{{ campus.count }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications Table -->
      <div class="table-section" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; color: #333; font-size: 18px; font-weight: 600;">
            Recent Applications
          </h3>
          <div style="display: flex; gap: 10px; align-items: center;">
            <span style="font-size: 14px; color: #666;">Filter by Status:</span>
            <Dropdown v-model="selectedStatusFilter" :options="statusFilterOptions" 
                     optionLabel="label" optionValue="value" placeholder="All Statuses" 
                     showClear style="width: 200px;" />
          </div>
        </div>
        
        <DataTable :value="filteredApplications" :paginator="true" :rows="10" 
                   :rowsPerPageOptions="[5, 10, 20, 50]"
                   responsiveLayout="scroll"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} applications"
                   style="font-size: 14px;">
          <Column field="Id" header="Application ID" :sortable="true" style="min-width: 120px;">
            <template #body="slotProps">
              <span style="font-weight: 600; color: #667eea;">{{ slotProps.data.Id }}</span>
            </template>
          </Column>
          <Column field="Date" header="Date" :sortable="true" style="min-width: 100px;"></Column>
          <Column field="BatchNum" header="Batch" :sortable="true" style="min-width: 80px;">
            <template #body="slotProps">
              <Tag :value="'Batch ' + slotProps.data.BatchNum" severity="info" />
            </template>
          </Column>
          <Column field="guardianName" header="Guardian" :sortable="true" style="min-width: 150px;"></Column>
          <Column field="studentCount" header="Students" :sortable="true" style="min-width: 90px;">
            <template #body="slotProps">
              <Tag :value="slotProps.data.studentCount" severity="success" rounded />
            </template>
          </Column>
          <Column field="Language" header="Language" :sortable="true" style="min-width: 100px;">
            <template #body="slotProps">
              <Tag :value="slotProps.data.Language" 
                   :severity="slotProps.data.Language === 'English' ? 'primary' : 'warning'" />
            </template>
          </Column>
          <Column field="statusType" header="Status" :sortable="true" style="min-width: 150px;">
            <template #body="slotProps">
              <Tag :value="slotProps.data.statusType" 
                   :severity="getStatusSeverity(slotProps.data.statusType)" />
            </template>
          </Column>
          <Column field="Printed" header="Printed" style="min-width: 80px;">
            <template #body="slotProps">
              <i :class="slotProps.data.Printed === 'true' ? 'pi pi-check-circle' : 'pi pi-times-circle'"
                 :style="{ color: slotProps.data.Printed === 'true' ? '#10b981' : '#ef4444', fontSize: '18px' }"></i>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'DashboardView',
  components: {
    Toast,
    Chart,
    DataTable,
    Column,
    Tag,
    Dropdown,
    ProgressSpinner
  },
  setup() {
    const toast = useToast();
    const applications = ref([]);
    const loading = ref(true);
    const selectedStatusFilter = ref(null);

    const statusFilterOptions = ref([
      { label: 'All Statuses', value: null },
      { label: 'Approved - Free', value: 'free' },
      { label: 'Approved - Reduced', value: 'reduced' },
      { label: 'Denied', value: 'denied' }
    ]);

    // Fetch applications data
    const fetchApplications = async () => {
      try {
        loading.value = true;
        const response = await fetch('/applications.json');
        const data = await response.json();
        applications.value = data.Applications || [];
        
        toast.add({
          severity: 'success',
          summary: 'Data Loaded',
          detail: `Successfully loaded ${applications.value.length} applications`,
          life: 3000
        });
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load applications data',
          life: 5000
        });
      } finally {
        loading.value = false;
      }
    };

    // Helper function to get application status
    const getApplicationStatus = (app) => {
      const status = app.Status?.find(s => s.Checked === 'true');
      if (!status) return 'Unknown';
      
      const mobileStatus = status.MobileStatus || status.Status;
      if (mobileStatus.toLowerCase().includes('free')) return 'free';
      if (mobileStatus.toLowerCase().includes('reduced')) return 'reduced';
      if (mobileStatus.toLowerCase().includes('denied') || mobileStatus.toLowerCase().includes('negada')) return 'denied';
      return 'Unknown';
    };

    // Computed: Total Applications
    const totalApplications = computed(() => applications.value.length);

    // Computed: Approved Free Count
    const approvedFreeCount = computed(() => {
      return applications.value.filter(app => getApplicationStatus(app) === 'free').length;
    });

    // Computed: Approved Reduced Count
    const approvedReducedCount = computed(() => {
      return applications.value.filter(app => getApplicationStatus(app) === 'reduced').length;
    });

    // Computed: Denied Count
    const deniedCount = computed(() => {
      return applications.value.filter(app => getApplicationStatus(app) === 'denied').length;
    });

    // Computed: Percentages
    const approvedFreePercentage = computed(() => {
      return totalApplications.value > 0 
        ? ((approvedFreeCount.value / totalApplications.value) * 100).toFixed(1)
        : 0;
    });

    const approvedReducedPercentage = computed(() => {
      return totalApplications.value > 0 
        ? ((approvedReducedCount.value / totalApplications.value) * 100).toFixed(1)
        : 0;
    });

    const deniedPercentage = computed(() => {
      return totalApplications.value > 0 
        ? ((deniedCount.value / totalApplications.value) * 100).toFixed(1)
        : 0;
    });

    // Computed: Students Statistics
    const totalStudents = computed(() => {
      return applications.value.reduce((sum, app) => sum + (app.Students?.length || 0), 0);
    });

    const avgStudentsPerApp = computed(() => {
      return totalApplications.value > 0 
        ? (totalStudents.value / totalApplications.value).toFixed(2)
        : 0;
    });

    const uniqueCampuses = computed(() => {
      const campuses = new Set();
      applications.value.forEach(app => {
        app.Students?.forEach(student => {
          if (student.Campus) campuses.add(student.Campus);
        });
      });
      return campuses.size;
    });

    // Computed: Processing Status
    const printedCount = computed(() => {
      return applications.value.filter(app => app.Printed === 'true').length;
    });

    const sentCount = computed(() => {
      return applications.value.filter(app => app.Sent === 'true').length;
    });

    const selectedCount = computed(() => {
      return applications.value.filter(app => app.Selected === 'true').length;
    });

    // Computed: Top Campuses
    const topCampuses = computed(() => {
      const campusCount = {};
      applications.value.forEach(app => {
        app.Students?.forEach(student => {
          if (student.Campus) {
            campusCount[student.Campus] = (campusCount[student.Campus] || 0) + 1;
          }
        });
      });
      
      return Object.entries(campusCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    });

    // Computed: Status Chart Data
    const statusChartData = computed(() => ({
      labels: ['Approved - Free', 'Approved - Reduced', 'Denied'],
      datasets: [{
        data: [approvedFreeCount.value, approvedReducedCount.value, deniedCount.value],
        backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
        hoverBackgroundColor: ['#059669', '#2563eb', '#dc2626']
      }]
    }));

    // Computed: Language Chart Data
    const languageChartData = computed(() => {
      const langCount = {};
      applications.value.forEach(app => {
        const lang = app.Language || 'Unknown';
        langCount[lang] = (langCount[lang] || 0) + 1;
      });

      return {
        labels: Object.keys(langCount),
        datasets: [{
          data: Object.values(langCount),
          backgroundColor: ['#667eea', '#f59e0b'],
          hoverBackgroundColor: ['#5a67d8', '#d97706']
        }]
      };
    });

    // Computed: Batch Chart Data
    const batchChartData = computed(() => {
      const batchCount = {};
      applications.value.forEach(app => {
        const batch = app.BatchNum || 'Unknown';
        batchCount[batch] = (batchCount[batch] || 0) + 1;
      });

      const sortedBatches = Object.keys(batchCount).sort((a, b) => a - b);

      return {
        labels: sortedBatches.map(b => `Batch ${b}`),
        datasets: [{
          label: 'Applications',
          data: sortedBatches.map(b => batchCount[b]),
          backgroundColor: '#667eea',
          borderColor: '#5a67d8',
          borderWidth: 2
        }]
      };
    });

    // Chart Options
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        }
      }
    });

    const batchChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    });

    // Computed: Filtered Applications for Table
    const filteredApplications = computed(() => {
      let filtered = applications.value.map(app => ({
        ...app,
        guardianName: app.Guardians?.[0] 
          ? `${app.Guardians[0].FirstName} ${app.Guardians[0].LastName}`
          : 'N/A',
        studentCount: app.Students?.length || 0,
        statusType: getApplicationStatus(app)
      }));

      // Filter by selected status if one is chosen
      if (selectedStatusFilter.value !== null && selectedStatusFilter.value !== undefined) {
        filtered = filtered.filter(app => app.statusType === selectedStatusFilter.value);
      }

      return filtered;
    });

    // Helper function for status severity
    const getStatusSeverity = (status) => {
      const statusMap = {
        'free': 'success',
        'reduced': 'info',
        'denied': 'danger',
        'Unknown': 'warning'
      };
      return statusMap[status] || 'warning';
    };

    onMounted(() => {
      fetchApplications();
    });

    return {
      applications,
      loading,
      selectedStatusFilter,
      statusFilterOptions,
      totalApplications,
      approvedFreeCount,
      approvedReducedCount,
      deniedCount,
      approvedFreePercentage,
      approvedReducedPercentage,
      deniedPercentage,
      totalStudents,
      avgStudentsPerApp,
      uniqueCampuses,
      printedCount,
      sentCount,
      selectedCount,
      topCampuses,
      statusChartData,
      languageChartData,
      batchChartData,
      chartOptions,
      batchChartOptions,
      filteredApplications,
      getStatusSeverity
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.summary-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15) !important;
}

.chart-card, .stat-card, .table-section, .batch-section {
  transition: box-shadow 0.3s ease;
}

.chart-card:hover, .stat-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
}

@media (max-width: 768px) {
  .dashboard-header h1 {
    font-size: 24px !important;
  }
  
  .summary-cards,
  .charts-section,
  .statistics-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

