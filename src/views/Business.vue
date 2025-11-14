<template>
  <div class="business-container">
    <div class="business-header">
      <h1>📊 Business Proposal</h1>
      <p class="subtitle">EPISD Meal Eligibility Application System</p>
    </div>

    <div class="tabs">
      <button 
        :class="['tab-button', { active: activeTab === 'executive' }]"
        @click="activeTab = 'executive'"
      >
        Executive Summary
      </button>
      <button 
        :class="['tab-button', { active: activeTab === 'full' }]"
        @click="activeTab = 'full'"
      >
        Full Proposal
      </button>
      <button 
        :class="['tab-button', { active: activeTab === 'roi' }]"
        @click="activeTab = 'roi'"
      >
        ROI Calculator
      </button>
    </div>

    <!-- Executive Summary Tab -->
    <div v-if="activeTab === 'executive'" class="content-section">
      <h2>Executive Summary</h2>
      
      <div class="card highlight-card">
        <h3>💰 The Opportunity</h3>
        <p>Automate your free and reduced-price meal application workflow, saving <strong>400+ staff hours</strong> and <strong>$18,500 annually</strong> while improving family communication.</p>
      </div>

      <div class="card">
        <h3>📋 Current Situation</h3>
        <div class="two-column">
          <div>
            <h4>Time Consuming:</h4>
            <ul>
              <li>Manual processing: 5-10 minutes per application</li>
              <li>2,000 applications = 150-300 hours of staff time</li>
              <li>Delayed notifications to families</li>
            </ul>
          </div>
          <div>
            <h4>Costly:</h4>
            <ul>
              <li>$3,000 in printing costs</li>
              <li>$1,200 in postage</li>
              <li>$4,000 in staff overtime</li>
              <li><strong>Total: $8,500/year</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card success-card">
        <h3>✅ The Solution</h3>
        <p><strong>Fully Automated Workflow:</strong></p>
        <div class="workflow">
          <div class="workflow-step">1. Import Applications</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">2. Generate Letters</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">3. Email PDFs</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">4. Track Everything</div>
        </div>
        
        <h4 style="margin-top: 20px;">Key Features:</h4>
        <div class="features-grid">
          <div class="feature">✅ Bilingual letters (English/Spanish)</div>
          <div class="feature">✅ Automated email delivery</div>
          <div class="feature">✅ Batch processing (100+ apps in minutes)</div>
          <div class="feature">✅ Cloud-based access</div>
          <div class="feature">✅ Role-based security</div>
          <div class="feature">✅ Complete audit trails</div>
        </div>
      </div>

      <div class="card pricing-card">
        <h3>💵 Investment Options</h3>
        <div class="pricing-options">
          <div class="pricing-option recommended">
            <div class="badge">Recommended</div>
            <h4>Annual Subscription</h4>
            <div class="price">$6,500<span>/year</span></div>
            <ul>
              <li>All features included</li>
              <li>Cloud hosting & support</li>
              <li>Automatic updates</li>
              <li>No IT overhead</li>
            </ul>
            <p class="renewal">Renewal: $5,500/year (15% discount)</p>
          </div>
          
          <div class="pricing-option">
            <h4>One-Time Purchase</h4>
            <div class="price">$22,000<span> + $3,500/year</span></div>
            <ul>
              <li>Own the software</li>
              <li>Self-hosted option</li>
              <li>Perpetual license</li>
            </ul>
          </div>
          
          <div class="pricing-option">
            <h4>Hybrid Model</h4>
            <div class="price">$8,000<span> + $4,000/year</span></div>
            <ul>
              <li>Custom configuration</li>
              <li>Intensive training</li>
              <li>Flexible terms</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card roi-card">
        <h3>📈 Financial Impact</h3>
        <div class="roi-summary">
          <div class="roi-item">
            <div class="roi-label">Annual Savings</div>
            <div class="roi-value success">$18,500</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">Investment (Year 1)</div>
            <div class="roi-value">$6,500</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">Net Benefit</div>
            <div class="roi-value success">$12,000</div>
          </div>
          <div class="roi-item">
            <div class="roi-label">Break-Even</div>
            <div class="roi-value">3-4 months</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Proposal Tab -->
    <div v-if="activeTab === 'full'" class="content-section">
      <h2>Complete Business Proposal</h2>
      
      <div class="card">
        <h3>📄 Proposal Documents</h3>
        <p>The complete proposal includes:</p>
        <ul>
          <li>✅ Executive Summary</li>
          <li>✅ Current Challenges Analysis</li>
          <li>✅ Solution Overview & Technical Stack</li>
          <li>✅ Detailed Feature Breakdown</li>
          <li>✅ ROI Calculations with Tables</li>
          <li>✅ Three Pricing Options</li>
          <li>✅ Implementation Timeline</li>
          <li>✅ Support & Maintenance Details</li>
          <li>✅ Security & Compliance Information</li>
          <li>✅ Success Metrics & Quarterly Reviews</li>
          <li>✅ FAQs and Technical Appendix</li>
        </ul>
        
        <div class="download-section">
          <h4>Download Full Documents:</h4>
          <div class="button-group">
            <a href="/EPISD_EXECUTIVE_SUMMARY.md" download class="download-button">
              📄 Executive Summary (2 pages)
            </a>
            <a href="/EPISD_PROPOSAL.md" download class="download-button">
              📋 Full Proposal (15 pages)
            </a>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>🎯 Key Talking Points</h3>
        
        <div class="talking-point">
          <h4>When they say: "That seems expensive..."</h4>
          <p><strong>Response:</strong> "It pays for itself in 3-4 months through time savings alone. You're currently spending $8,500 on printing, postage, and overtime. This system costs $540/month for unlimited applications - less than hiring temporary help during peak periods."</p>
        </div>
        
        <div class="talking-point">
          <h4>When they say: "We need IT to review it..."</h4>
          <p><strong>Response:</strong> "Great! It's cloud-hosted so no servers or infrastructure needed. We handle all maintenance, backups, and security updates. Happy to schedule a technical deep-dive with your IT team to address any concerns."</p>
        </div>
        
        <div class="talking-point">
          <h4>When they say: "Can we try it first?"</h4>
          <p><strong>Response:</strong> "Absolutely! We offer a 30-day pilot where you process your next batch using the system - completely risk free. You'll see the time savings immediately, and there's no commitment until you're satisfied it works for EPISD."</p>
        </div>
      </div>

      <div class="card">
        <h3>📞 Next Steps</h3>
        <div class="next-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>30-Minute Demo</h4>
              <p>See the system in action with real application data</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>30-Day Pilot Program</h4>
              <p>Process your next batch using the system - risk free</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Full Proposal Review</h4>
              <p>Detailed presentation for decision makers</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROI Calculator Tab -->
    <div v-if="activeTab === 'roi'" class="content-section">
      <h2>ROI Calculator</h2>
      
      <div class="card">
        <h3>🧮 Customize Your ROI Calculation</h3>
        <div class="calculator">
          <div class="calc-input">
            <label>Number of Applications per Year:</label>
            <input type="number" v-model.number="applications" @input="calculateROI" />
          </div>
          
          <div class="calc-input">
            <label>Average Staff Hourly Rate:</label>
            <input type="number" v-model.number="hourlyRate" @input="calculateROI" />
          </div>
          
          <div class="calc-input">
            <label>Minutes per Manual Application:</label>
            <input type="number" v-model.number="minutesPerApp" @input="calculateROI" />
          </div>
        </div>
      </div>

      <div class="card roi-card">
        <h3>💰 Your Estimated Savings</h3>
        <div class="roi-results">
          <div class="roi-result-item">
            <div class="result-label">Total Manual Hours per Year</div>
            <div class="result-value">{{ totalHours.toFixed(0) }} hours</div>
          </div>
          
          <div class="roi-result-item">
            <div class="result-label">Automated Processing Time (75% reduction)</div>
            <div class="result-value">{{ automatedHours.toFixed(0) }} hours</div>
          </div>
          
          <div class="roi-result-item success-result">
            <div class="result-label">Time Saved</div>
            <div class="result-value">{{ timeSaved.toFixed(0) }} hours</div>
          </div>
          
          <div class="roi-result-item success-result">
            <div class="result-label">Labor Cost Savings</div>
            <div class="result-value">${{ laborSavings.toLocaleString() }}</div>
          </div>
          
          <div class="roi-result-item">
            <div class="result-label">Operational Cost Savings (printing, postage, etc.)</div>
            <div class="result-value">${{ operationalSavings.toLocaleString() }}</div>
          </div>
          
          <div class="roi-result-item highlight-result">
            <div class="result-label">Total Annual Savings</div>
            <div class="result-value">${{ totalSavings.toLocaleString() }}</div>
          </div>
          
          <div class="roi-result-item">
            <div class="result-label">Annual Subscription Cost</div>
            <div class="result-value">$6,500</div>
          </div>
          
          <div class="roi-result-item success-result">
            <div class="result-label">Net Annual Benefit</div>
            <div class="result-value">${{ netBenefit.toLocaleString() }}</div>
          </div>
          
          <div class="roi-result-item">
            <div class="result-label">ROI Percentage</div>
            <div class="result-value">{{ roiPercent.toFixed(0) }}%</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>📊 Detailed Breakdown</h3>
        <table class="breakdown-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Current Annual Cost</th>
              <th>With System</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Staff Time ({{ totalHours.toFixed(0) }} hrs @ ${{ hourlyRate }}/hr)</td>
              <td>${{ (totalHours * hourlyRate).toLocaleString() }}</td>
              <td>${{ (automatedHours * hourlyRate).toLocaleString() }}</td>
              <td class="success-text">${{ laborSavings.toLocaleString() }}</td>
            </tr>
            <tr>
              <td>Printing & Paper</td>
              <td>$3,000</td>
              <td>$500</td>
              <td class="success-text">$2,500</td>
            </tr>
            <tr>
              <td>Postage</td>
              <td>${{ (applications * 0.60).toFixed(0) }}</td>
              <td>$0</td>
              <td class="success-text">${{ (applications * 0.60).toFixed(0) }}</td>
            </tr>
            <tr>
              <td>Materials & Envelopes</td>
              <td>$800</td>
              <td>$0</td>
              <td class="success-text">$800</td>
            </tr>
            <tr>
              <td>Staff Overtime</td>
              <td>$4,000</td>
              <td>$500</td>
              <td class="success-text">$3,500</td>
            </tr>
            <tr class="total-row">
              <td><strong>Total</strong></td>
              <td><strong>${{ currentTotalCost.toLocaleString() }}</strong></td>
              <td><strong>${{ systemTotalCost.toLocaleString() }}</strong></td>
              <td class="success-text"><strong>${{ totalSavings.toLocaleString() }}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'BusinessView',
  setup() {
    const activeTab = ref('executive');
    
    // ROI Calculator inputs
    const applications = ref(2000);
    const hourlyRate = ref(25);
    const minutesPerApp = ref(7.5);
    
    // Calculated values
    const totalHours = computed(() => {
      return (applications.value * minutesPerApp.value) / 60;
    });
    
    const automatedHours = computed(() => {
      return totalHours.value * 0.25; // 75% time reduction
    });
    
    const timeSaved = computed(() => {
      return totalHours.value - automatedHours.value;
    });
    
    const laborSavings = computed(() => {
      return Math.round(timeSaved.value * hourlyRate.value);
    });
    
    const operationalSavings = computed(() => {
      return 2500 + (applications.value * 0.60) + 800 + 3500; // printing + postage + materials + overtime
    });
    
    const totalSavings = computed(() => {
      return laborSavings.value + operationalSavings.value;
    });
    
    const netBenefit = computed(() => {
      return totalSavings.value - 6500; // Subtract subscription cost
    });
    
    const roiPercent = computed(() => {
      return (netBenefit.value / 6500) * 100;
    });
    
    const currentTotalCost = computed(() => {
      return Math.round(totalHours.value * hourlyRate.value + 3000 + (applications.value * 0.60) + 800 + 4000);
    });
    
    const systemTotalCost = computed(() => {
      return Math.round(automatedHours.value * hourlyRate.value + 500 + 500);
    });
    
    const calculateROI = () => {
      // Reactive computed properties will automatically recalculate
    };
    
    return {
      activeTab,
      applications,
      hourlyRate,
      minutesPerApp,
      totalHours,
      automatedHours,
      timeSaved,
      laborSavings,
      operationalSavings,
      totalSavings,
      netBenefit,
      roiPercent,
      currentTotalCost,
      systemTotalCost,
      calculateROI
    };
  }
};
</script>

<style scoped>
.business-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.business-header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;
}

.business-header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-top: 10px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-button {
  flex: 1;
  min-width: 150px;
  padding: 15px 20px;
  border: none;
  background: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.tab-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.tab-button.active {
  background: #667eea;
  color: white;
}

.content-section {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.highlight-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.highlight-card h3 {
  color: white;
}

.success-card {
  border-left: 5px solid #10b981;
}

.pricing-card {
  border-left: 5px solid #f59e0b;
}

.roi-card {
  border-left: 5px solid #3b82f6;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

.workflow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.workflow-step {
  background: #667eea;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  font-weight: 600;
  min-width: 150px;
  text-align: center;
}

.workflow-arrow {
  font-size: 2rem;
  color: #667eea;
  font-weight: bold;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.feature {
  padding: 10px;
  background: #f0fdf4;
  border-radius: 5px;
  border-left: 3px solid #10b981;
}

.pricing-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.pricing-option {
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 25px;
  position: relative;
  transition: all 0.3s;
}

.pricing-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.pricing-option.recommended {
  border-color: #667eea;
  background: linear-gradient(to bottom, #f0f4ff, white);
}

.badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #667eea;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.pricing-option h4 {
  margin-top: 0;
  font-size: 1.3rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin: 15px 0;
}

.price span {
  font-size: 1rem;
  color: #6b7280;
}

.pricing-option ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.pricing-option li {
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
}

.pricing-option li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.renewal {
  font-size: 0.9rem;
  color: #6b7280;
  font-style: italic;
}

.roi-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.roi-item {
  text-align: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.roi-label {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 10px;
}

.roi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.roi-value.success {
  color: #10b981;
}

.download-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #e5e7eb;
}

.button-group {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.download-button {
  display: inline-block;
  padding: 15px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.download-button:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.talking-point {
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 15px;
}

.talking-point h4 {
  color: #667eea;
  margin-top: 0;
}

.next-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #6b7280;
}

.calculator {
  display: grid;
  gap: 20px;
}

.calc-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calc-input label {
  font-weight: 600;
  color: #333;
}

.calc-input input {
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
}

.calc-input input:focus {
  outline: none;
  border-color: #667eea;
}

.roi-results {
  display: grid;
  gap: 15px;
  margin-top: 20px;
}

.roi-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
}

.roi-result-item.success-result {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
}

.roi-result-item.highlight-result {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.roi-result-item.highlight-result .result-label,
.roi-result-item.highlight-result .result-value {
  color: white;
}

.result-label {
  font-weight: 600;
  color: #6b7280;
  flex: 1;
}

.result-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.breakdown-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.breakdown-table th,
.breakdown-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.breakdown-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #333;
}

.breakdown-table .total-row {
  background: #f9fafb;
  font-weight: bold;
}

.success-text {
  color: #10b981;
  font-weight: 600;
}

@media (max-width: 768px) {
  .business-header h1 {
    font-size: 1.8rem;
  }
  
  .workflow {
    flex-direction: column;
  }
  
  .workflow-arrow {
    transform: rotate(90deg);
  }
  
  .pricing-options {
    grid-template-columns: 1fr;
  }
  
  .roi-summary {
    grid-template-columns: 1fr;
  }
  
  .breakdown-table {
    font-size: 0.9rem;
  }
  
  .breakdown-table th,
  .breakdown-table td {
    padding: 10px;
  }
}
</style>

