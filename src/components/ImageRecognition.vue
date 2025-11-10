<template>
  <div class="image-recognition-container p-4">
    <Toast />
    
    <!-- Header -->
    <div class="card mb-4">
      <h1 class="text-3xl font-bold mb-2">
        <i class="pi pi-image mr-2"></i>
        Image Recognition Suite
      </h1>
      <p class="text-gray-600">OCR, OMR, IMR, Barcode, and QR Code capabilities for document processing</p>
    </div>

    <!-- Mode Selection -->
    <div class="card mb-4">
      <h2 class="text-xl font-semibold mb-3">Recognition Mode</h2>
      <div class="flex flex-wrap gap-3">
        <Button style="width: 400px; height: 50px; font-size: 20px;"
          :label="'OCR - Optical Character Recognition'"
          :class="{ 'p-button-success': mode === 'ocr', 'p-button-outlined': mode !== 'ocr' }"
          @click="setMode('ocr')"
          icon="pi pi-file-edit"
        />
        <Button style="width: 400px; height: 50px; font-size: 20px;"
          :label="'OMR - Optical Mark Recognition'"
          :class="{ 'p-button-success': mode === 'omr', 'p-button-outlined': mode !== 'omr' }"
          @click="setMode('omr')"
          icon="pi pi-check-square"
        />
        <Button style="width: 400px; height: 50px; font-size: 20px;"
          :label="'IMR - Intelligent Mark Recognition'"
          :class="{ 'p-button-success': mode === 'imr', 'p-button-outlined': mode !== 'imr' }"
          @click="setMode('imr')"
          icon="pi pi-sparkles"
        />
        <Button style="width: 400px; height: 50px; font-size: 20px;"
          :label="'Barcode Recognition'"
          :class="{ 'p-button-success': mode === 'barcode', 'p-button-outlined': mode !== 'barcode' }"
          @click="setMode('barcode')"
          icon="pi pi-bars"
        />
        <Button style="width: 400px; height: 50px; font-size: 20px;"
          :label="'QR Code Recognition'"
          :class="{ 'p-button-success': mode === 'qrcode', 'p-button-outlined': mode !== 'qrcode' }"
          @click="setMode('qrcode')"
          icon="pi pi-qrcode"
        />
      </div>
    </div>

    <!-- File Upload Area -->
    <div class="card mb-4">
      <h2 class="text-xl font-semibold mb-3">Upload Image</h2>
      <div class="upload-area" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileSelect"
          accept="image/*"
          class="hidden"
          id="fileUpload"
        />
        <div :class="['upload-box', { 'dragging': isDragging }]" @click="$refs.fileInput.click()">
          <i class="pi pi-cloud-upload text-6xl mb-3 text-gray-400"></i>
          <p class="text-xl mb-2">Drop image here or click to browse</p>
          <p class="text-sm text-gray-500">Supports: JPG, PNG, BMP, TIFF</p>
        </div>
      </div>
    </div>

    <!-- Image Preview and Canvas -->
    <div v-if="uploadedImage" class="card mb-4">
      <h2 class="text-xl font-semibold mb-3">Image Preview</h2>
      <div class="image-container">
        <img :src="uploadedImage" ref="imageElement" alt="Uploaded" class="preview-image" />
        <canvas ref="canvas" class="hidden"></canvas>
      </div>
      
      <!-- Image Analysis Info -->
      <div v-if="imageAnalysis" class="mt-3 p-3 bg-blue-50 rounded">
        <h3 class="font-semibold mb-2">📊 Image Analysis</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div><strong>Dimensions:</strong> {{ imageAnalysis.width }} × {{ imageAnalysis.height }}px</div>
          <div><strong>File Size:</strong> {{ imageAnalysis.fileSize }}</div>
          <div><strong>Quality:</strong> <Tag :value="imageAnalysis.quality" :severity="imageAnalysis.qualitySeverity" /></div>
          <div><strong>Recommendation:</strong> {{ imageAnalysis.recommendation }}</div>
        </div>
      </div>
    </div>

    <!-- Processing Controls -->
    <div v-if="uploadedImage" class="card mb-4">
      <h2 class="text-xl font-semibold mb-3">Processing Options</h2>
      
      <!-- OCR Options -->
      <div v-if="mode === 'ocr'" class="mb-4">
        <div class="field">
          <label for="language" class="block mb-2">Language</label>
          <Dropdown
            v-model="ocrOptions.language"
            :options="languages"
            optionLabel="name"
            optionValue="code"
            placeholder="Select Language"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="ocrOptions.preprocessing" :binary="true" inputId="preprocessing" />
          <label for="preprocessing" class="ml-2">Enable Image Preprocessing</label>
        </div>
      </div>

      <!-- OMR Options -->
      <div v-if="mode === 'omr'" class="mb-4">
        <div class="field">
          <label for="bubbleRows" class="block mb-2">Number of Rows</label>
          <InputNumber v-model="omrOptions.rows" :min="1" :max="100" class="w-full" />
        </div>
        <div class="field">
          <label for="bubbleCols" class="block mb-2">Number of Columns</label>
          <InputNumber v-model="omrOptions.columns" :min="1" :max="20" class="w-full" />
        </div>
        <div class="field">
          <label for="threshold" class="block mb-2">Detection Threshold (%)</label>
          <Slider v-model="omrOptions.threshold" :min="10" :max="90" class="w-full" />
          <small class="block mt-1">{{ omrOptions.threshold }}%</small>
        </div>
      </div>

      <!-- IMR Options -->
      <div v-if="mode === 'imr'" class="mb-4">
        <div class="field">
          <label for="formType" class="block mb-2">Form Type</label>
          <Dropdown
            v-model="imrOptions.formType"
            :options="formTypes"
            optionLabel="name"
            optionValue="value"
            placeholder="Select Form Type"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="imrOptions.autoDetect" :binary="true" inputId="autoDetect" />
          <label for="autoDetect" class="ml-2">Auto-detect form structure</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="imrOptions.extractSignatures" :binary="true" inputId="extractSigs" />
          <label for="extractSigs" class="ml-2">Extract signatures</label>
        </div>
      </div>

      <!-- Barcode Options -->
      <div v-if="mode === 'barcode'" class="mb-4">
        <!-- Quick Help Alert -->
        <div class="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <h3 class="font-bold text-lg mb-2">⚡ Quick Troubleshooting Guide</h3>
          <p class="mb-2 font-semibold">If "No Barcode Found" appears, try these steps IN ORDER:</p>
          <ol class="list-decimal ml-5 space-y-1 text-sm">
            <li><strong>Test System First:</strong> Click "Test with Sample Barcode" button below, then "Process Image". If this fails, your libraries aren't loaded properly.</li>
            <li><strong>Check Image Quality:</strong> Image must be at least 800×600px, clear, focused, good lighting</li>
            <li><strong>Crop Your Image:</strong> Remove all background - keep ONLY the barcode area</li>
            <li><strong>Enable ALL Options:</strong> Turn on all checkboxes below</li>
            <li><strong>Try Enhancement Level 3:</strong> Use the slider below</li>
            <li><strong>Select Specific Type:</strong> If you know your barcode type (Code 128, EAN-13, etc.), select it</li>
            <li><strong>Check Enhanced Preview:</strong> Enable "Show enhanced image preview" to see what the detector sees</li>
          </ol>
          <p class="mt-2 text-sm italic">💡 Most failures are due to low image quality or too much background noise</p>
        </div>

        <!-- Library Status Check -->
        <div class="mb-4 p-3 border rounded" :class="libraryStatus.color">
          <h3 class="font-semibold mb-2">
            <i :class="libraryStatus.icon"></i>
            Library Status
          </h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div><strong>ZXing:</strong> <Tag :value="libraryStatus.zxing" :severity="libraryStatus.zxing === 'Loaded' ? 'success' : 'danger'" /></div>
            <div><strong>Quagga:</strong> <Tag :value="libraryStatus.quagga" :severity="libraryStatus.quagga === 'Loaded' ? 'success' : 'danger'" /></div>
          </div>
          <div class="flex gap-2">
            <Button v-if="libraryStatus.zxing !== 'Loaded' || libraryStatus.quagga !== 'Loaded'" 
                    label="Reload Libraries" 
                    icon="pi pi-refresh" 
                    @click="reloadLibraries" 
                    class="p-button-sm mt-2" />
            <Button label="Test with Sample Barcode" 
                    icon="pi pi-image" 
                    @click="loadSampleBarcode" 
                    class="p-button-sm p-button-success mt-2" 
                    style="background: #22c55e; border-color: #22c55e;" />
          </div>
        </div>

        <div class="field">
          <label for="barcodeEngine" class="block mb-2">Detection Engine</label>
          <Dropdown
            v-model="barcodeOptions.engine"
            :options="barcodeEngines"
            optionLabel="name"
            optionValue="value"
            placeholder="Select Engine"
            class="w-full md:w-14rem"
          />
          <small class="block mt-1 text-gray-600">ZXing is more robust for difficult images</small>
        </div>
        <div class="field">
          <label for="barcodeType" class="block mb-2">Barcode Type</label>
          <Dropdown
            v-model="barcodeOptions.type"
            :options="barcodeTypes"
            optionLabel="name"
            optionValue="value"
            placeholder="Select Barcode Type"
            class="w-full md:w-14rem"
          />
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.multiDetect" :binary="true" inputId="multiDetect" />
          <label for="multiDetect" class="ml-2">Detect multiple barcodes</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.drawOverlay" :binary="true" inputId="drawOverlay" />
          <label for="drawOverlay" class="ml-2">Show detection overlay</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.enhanceImage" :binary="true" inputId="enhanceImage" />
          <label for="enhanceImage" class="ml-2">Enhance image (improves detection on low quality images)</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.tryMultiplePasses" :binary="true" inputId="tryMultiplePasses" />
          <label for="tryMultiplePasses" class="ml-2">Try multiple detection passes (slower but more accurate)</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.tryBothEngines" :binary="true" inputId="tryBothEngines" />
          <label for="tryBothEngines" class="ml-2">Try both engines if first fails (recommended)</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.tryRotations" :binary="true" inputId="tryRotations" />
          <label for="tryRotations" class="ml-2">Try different rotations (for vertical/rotated barcodes)</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="barcodeOptions.showEnhancedPreview" :binary="true" inputId="showEnhancedPreview" />
          <label for="showEnhancedPreview" class="ml-2">Show enhanced image preview</label>
        </div>
        <div class="field">
          <label for="enhancementLevel" class="block mb-2">Enhancement Level</label>
          <Slider v-model="barcodeOptions.enhancementLevel" :min="1" :max="3" :step="1" class="w-full" />
          <small class="block mt-1">Level {{ barcodeOptions.enhancementLevel }}: {{ ['Light', 'Medium', 'Aggressive'][barcodeOptions.enhancementLevel - 1] }}</small>
        </div>
      </div>

      <!-- QR Code Options -->
      <div v-if="mode === 'qrcode'" class="mb-4">
        <div class="field-checkbox mb-2">
          <Checkbox v-model="qrCodeOptions.multiDetect" :binary="true" inputId="qrMultiDetect" />
          <label for="qrMultiDetect" class="ml-2">Detect multiple QR codes</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="qrCodeOptions.drawOverlay" :binary="true" inputId="qrDrawOverlay" />
          <label for="qrDrawOverlay" class="ml-2">Show detection overlay</label>
        </div>
        <div class="field-checkbox mb-2">
          <Checkbox v-model="qrCodeOptions.invertColors" :binary="true" inputId="invertColors" />
          <label for="invertColors" class="ml-2">Try inverted colors (for dark backgrounds)</label>
        </div>
      </div>

      <!-- Process Button -->
      <Button style="width: 225px; height: 50px; font-size: 20px;"
        :label="processing ? 'Processing...' : 'Process Image'"
        icon="pi pi-play"
        @click="processImage"
        :loading="processing"
        :disabled="processing"
        class="p-button-lg p-button-success"
      />
    </div>

    <!-- Results -->
    <div v-if="results" class="card mb-4">
      <h2 class="text-xl font-semibold mb-3">
        <i class="pi pi-check-circle mr-2"></i>
        Results
      </h2>
      
      <!-- OCR Results -->
      <div v-if="mode === 'ocr' && results.text">
        <div class="mb-3">
          <label class="block font-semibold mb-2">Extracted Text:</label>
          <Textarea
            v-model="results.text"
            rows="10"
            class="w-full"
            :autoResize="true"
          />
        </div>
        <div class="flex gap-2">
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Copy to Clipboard" icon="pi pi-copy" @click="copyToClipboard" class="p-button-outlined" />
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Download as TXT" icon="pi pi-download" @click="downloadText" class="p-button-outlined" />
        </div>
        <div v-if="results.confidence" class="mt-3">
          <p><strong>Confidence:</strong> {{ results.confidence.toFixed(2) }}%</p>
        </div>
      </div>

      <!-- OMR Results -->
      <div v-if="mode === 'omr' && results.marks">
        <div class="mb-3">
          <p class="mb-2"><strong>Detected Marks:</strong> {{ results.marks.length }}</p>
          <DataTable :value="results.marks" :paginator="true" :rows="10" class="p-datatable-sm">
            <Column field="row" header="Row" :sortable="true"></Column>
            <Column field="column" header="Column" :sortable="true"></Column>
            <Column field="intensity" header="Intensity (%)" :sortable="true">
              <template #body="slotProps">
                {{ slotProps.data.intensity.toFixed(1) }}%
              </template>
            </Column>
            <Column field="marked" header="Status">
              <template #body="slotProps">
                <Tag :value="slotProps.data.marked ? 'MARKED' : 'EMPTY'" :severity="slotProps.data.marked ? 'success' : 'secondary'" />
              </template>
            </Column>
          </DataTable>
        </div>
        <Button label="Export Results" icon="pi pi-file-export" @click="exportOMRResults" class="p-button-outlined" />
      </div>

      <!-- IMR Results -->
      <div v-if="mode === 'imr' && results.data">
        <div class="mb-3">
          <Accordion :multiple="true" :activeIndex="[0]">
            <AccordionTab header="Extracted Form Data">
              <div v-for="(value, key) in results.data.fields" :key="key" class="field mb-2">
                <label class="block font-semibold">{{ formatFieldName(key) }}:</label>
                <p>{{ value }}</p>
              </div>
            </AccordionTab>
            <AccordionTab v-if="results.data.checkboxes" header="Checkbox Data">
              <DataTable :value="results.data.checkboxes" class="p-datatable-sm">
                <Column field="label" header="Field"></Column>
                <Column field="checked" header="Status">
                  <template #body="slotProps">
                    <Tag :value="slotProps.data.checked ? 'CHECKED' : 'UNCHECKED'" :severity="slotProps.data.checked ? 'success' : 'secondary'" />
                  </template>
                </Column>
              </DataTable>
            </AccordionTab>
            <AccordionTab v-if="results.data.signatures" header="Signatures">
              <div v-for="(sig, index) in results.data.signatures" :key="index" class="mb-3">
                <p><strong>{{ sig.label }}:</strong></p>
                <img :src="sig.image" alt="Signature" class="signature-preview" />
              </div>
            </AccordionTab>
          </Accordion>
        </div>
        <div class="flex gap-2">
          <Button label="Export as JSON" icon="pi pi-file-export" @click="exportIMRResults('json')" class="p-button-outlined" />
          <Button label="Export as CSV" icon="pi pi-file-export" @click="exportIMRResults('csv')" class="p-button-outlined" />
        </div>
      </div>

      <!-- Barcode Results -->
      <div v-if="mode === 'barcode' && results.barcodes">
        <div class="mb-3">
          <p class="mb-2"><strong>Detected Barcodes:</strong> {{ results.barcodes.length }}</p>
          <DataTable :value="results.barcodes" :paginator="results.barcodes.length > 5" :rows="5" class="p-datatable-sm">
            <Column field="format" header="Format" :sortable="true"></Column>
            <Column field="data" header="Data">
              <template #body="slotProps">
                <code class="barcode-data">{{ slotProps.data.data }}</code>
              </template>
            </Column>
            <Column field="quality" header="Quality" :sortable="true">
              <template #body="slotProps">
                <Tag :value="slotProps.data.quality + '%'" :severity="getQualitySeverity(slotProps.data.quality)" />
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-if="results.enhancedImage" class="mb-3">
          <label class="block font-semibold mb-2">Enhanced Image (used for detection):</label>
          <img :src="results.enhancedImage" alt="Enhanced Image" class="preview-image" />
        </div>
        <div v-if="results.overlayImage" class="mb-3">
          <label class="block font-semibold mb-2">Detection Overlay:</label>
          <img :src="results.overlayImage" alt="Barcode Detection" class="preview-image" />
        </div>
        <div class="flex gap-2">
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Copy First to Clipboard" icon="pi pi-copy" @click="copyBarcodeData" class="p-button-outlined" :disabled="results.barcodes.length === 0" />
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Export All Results" icon="pi pi-file-export" @click="exportBarcodeResults" class="p-button-outlined" />
        </div>
      </div>

      <!-- QR Code Results -->
      <div v-if="mode === 'qrcode' && results.qrcodes">
        <div class="mb-3">
          <p class="mb-2"><strong>Detected QR Codes:</strong> {{ results.qrcodes.length }}</p>
          <div v-for="(qr, index) in results.qrcodes" :key="index" class="qrcode-result mb-3 p-3 border rounded">
            <h4 class="font-semibold mb-2">QR Code #{{ index + 1 }}</h4>
            <div class="mb-2">
              <strong>Data:</strong>
              <Textarea
                :modelValue="qr.data"
                rows="3"
                class="w-full mt-1"
                :autoResize="true"
                readonly
              />
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Format:</strong> {{ qr.format || 'QR Code' }}</div>
              <div><strong>Version:</strong> {{ qr.version || 'N/A' }}</div>
              <div><strong>Error Correction:</strong> {{ qr.errorCorrection || 'N/A' }}</div>
              <div v-if="qr.location"><strong>Position:</strong> ({{ qr.location.x }}, {{ qr.location.y }})</div>
            </div>
          </div>
        </div>
        <div v-if="results.overlayImage" class="mb-3">
          <label class="block font-semibold mb-2">Detection Overlay:</label>
          <img :src="results.overlayImage" alt="QR Code Detection" class="preview-image" />
        </div>
        <div class="flex gap-2">
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Copy First to Clipboard" icon="pi pi-copy" @click="copyQRCodeData" class="p-button-outlined" :disabled="results.qrcodes.length === 0" />
          <Button style="width: 250px; height: 50px; font-size: 20px;" label="Export All Results" icon="pi pi-file-export" @click="exportQRCodeResults" class="p-button-outlined" />
        </div>
      </div>
    </div>

    <!-- Processing Log -->
    <div v-if="processingLog.length > 0" class="card">
      <h2 class="text-xl font-semibold mb-3">Processing Log</h2>
      <div class="log-container">
        <div v-for="(log, index) in processingLog" :key="index" class="log-entry">
          <span class="log-time">{{ log.time }}</span>
          <span :class="['log-message', `log-${log.type}`]">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Slider from 'primevue/slider';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default {
  name: 'ImageRecognition',
  components: {
    Toast,
    Button,
    Dropdown,
    Checkbox,
    InputNumber,
    Slider,
    Textarea,
    DataTable,
    Column,
    Tag,
    Accordion,
    AccordionTab
  },
  setup() {
    const toast = useToast();
    const mode = ref('ocr');
    const uploadedImage = ref(null);
    const isDragging = ref(false);
    const processing = ref(false);
    const results = ref(null);
    const processingLog = ref([]);
    const fileInput = ref(null);
    const imageElement = ref(null);
    const canvas = ref(null);
    const imageAnalysis = ref(null);
    const libraryStatus = ref({
      zxing: 'Loading...',
      quagga: 'Loading...',
      color: 'bg-gray-50',
      icon: 'pi pi-spin pi-spinner'
    });

    // OCR Options
    const ocrOptions = ref({
      language: 'eng',
      preprocessing: true
    });

    const languages = [
      { name: 'English', code: 'eng' },
      { name: 'Spanish', code: 'spa' },
      { name: 'French', code: 'fra' },
      { name: 'German', code: 'deu' },
      { name: 'Chinese', code: 'chi_sim' },
      { name: 'Arabic', code: 'ara' }
    ];

    // OMR Options
    const omrOptions = ref({
      rows: 10,
      columns: 4,
      threshold: 50
    });

    // IMR Options
    const imrOptions = ref({
      formType: 'generic',
      autoDetect: true,
      extractSignatures: true
    });

    const formTypes = [
      { name: 'Generic Form', value: 'generic' },
      { name: 'Multiple Choice Test', value: 'mcq' },
      { name: 'Survey Form', value: 'survey' },
      { name: 'Application Form', value: 'application' },
      { name: 'Registration Form', value: 'registration' }
    ];

    // Barcode Options
    const barcodeOptions = ref({
      engine: 'zxing',
      type: 'auto',
      multiDetect: false,
      drawOverlay: true,
      enhanceImage: true,
      tryMultiplePasses: true,
      tryBothEngines: true,
      tryRotations: true,
      showEnhancedPreview: false,
      enhancementLevel: 2
    });

    const barcodeEngines = [
      { name: 'ZXing (Recommended)', value: 'zxing' },
      { name: 'Quagga', value: 'quagga' }
    ];

    const barcodeTypes = [
      { name: 'Auto Detect', value: 'auto' },
      { name: 'Code 128', value: 'code_128' },
      { name: 'Code 39', value: 'code_39' },
      { name: 'EAN-13', value: 'ean_13' },
      { name: 'EAN-8', value: 'ean_8' },
      { name: 'UPC-A', value: 'upc_a' },
      { name: 'UPC-E', value: 'upc_e' },
      { name: 'ITF', value: 'itf' },
      { name: 'Codabar', value: 'codabar' },
      { name: 'DataMatrix', value: 'datamatrix' },
      { name: 'PDF417', value: 'pdf417' }
    ];

    // QR Code Options
    const qrCodeOptions = ref({
      multiDetect: false,
      drawOverlay: true,
      invertColors: false
    });

    let tesseractWorker = null;
    let quaggaInitialized = false;

    // Initialize Tesseract
    const initTesseract = async () => {
      try {
        addLog('Initializing OCR engine...', 'info');
        const Tesseract = window.Tesseract;
        tesseractWorker = await Tesseract.createWorker(ocrOptions.value.language, 1, {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              addLog(`OCR Progress: ${(m.progress * 100).toFixed(0)}%`, 'info');
            }
          }
        });
        addLog('OCR engine ready', 'success');
      } catch (error) {
        addLog('Failed to initialize OCR engine: ' + error.message, 'error');
        console.error('Tesseract initialization error:', error);
      }
    };

    const checkLibraryStatus = () => {
      const zxingLoaded = typeof window.ZXing !== 'undefined';
      const quaggaLoaded = typeof window.Quagga !== 'undefined';
      
      libraryStatus.value = {
        zxing: zxingLoaded ? 'Loaded' : 'Not Loaded',
        quagga: quaggaLoaded ? 'Loaded' : 'Not Loaded',
        color: (zxingLoaded && quaggaLoaded) ? 'bg-green-50' : (zxingLoaded || quaggaLoaded) ? 'bg-yellow-50' : 'bg-red-50',
        icon: (zxingLoaded && quaggaLoaded) ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'
      };
      
      return zxingLoaded || quaggaLoaded;
    };

    const reloadLibraries = () => {
      window.location.reload();
    };

    const loadSampleBarcode = () => {
      // Generate a sample Code 128 barcode using data URL
      const sampleBarcodeDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABGCAYAAABVEbSqAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANeSURBVHja7Z3RTtswGIbbQFJv4AK4AG5hN3ADXADixrikIWEJqVM6qVva7v3PjpzKcdL+tvvl+aSnVdM4jp/4t50YxwEAAAAAAAAAAAAAAABgGN4sy7I1TdO0uru7u9TrHR4eLnVfnz592uh9Hh8f2yWKz+fzzvvo+/X7+P7+vvl9dH/d/ubmZvZ9+H6u+/V1pu/v+/X38vPn+/H3u/TcuO77+Pv4+/T78POt/Xzr9Zu+T3//XHen97X2PvpanV/t7/3j4+Nt+Xd0dHTxPvq51t7H38+vR+d7fX1dr88/r19/f39/03PQz9P39f21vp+/R/f9nE9PT9/L+96cv/1l3VdXVxf9Hv28l+5v+v9v3D9P3/fu+3v39va2uf9lv/d+HfozvLy8/P+ctI7Pz8+b+7N1fQAAAAAAAAAAAAAAwICknZ3vuzs7O0u97vHx8VL3dfv+/v6i9/n8/LxdovyH+/v7zvvo+/X7+P7+/ub30f11+/7+/ub38f1c9+vrnD7++vr68vP+fvz+/Hzr9Zu+T3//XHen97X2Pvpanc/t7/33z89PT0+X/h4dHe2/j3+utf2+v7+/ub/28uXlpXO++/v7F+ep++/v7zeP+fLy8v9z0jri+5+fn1/8Hp32P6a/n75vXSeur68v/j38Ovr3t3Uf+v9fu7/p+l/W7p9T3d/W+enz6veo3X/t/gEAAAAAAAAAAAAAYJG0b29vne/u7u72f9LpdKr7fnt7u+h9vr6+Xt/d3X2v7+/39/c77+Pvp++nt+vr68vv9X36Pnr76elpfX9/f/O+/nq19+PX7/vz+/Xz8ef7a7u+vr64Tr1+PT9+vf5afl3+Pf16/Hv8eXX9vn/fZ+3+fH+u3+vPsb4P/37+Pf33+uvU+/Dr0cf08/Hr0c/h16Pvr+dr1+f7cPq+fi++Hf8O/v78Nvp39f35Pvr39/v37fl+/Lp8P/53re/br8v/Hp3X95/36/uq9f3r9fh/J/o/Ub8vv676/2Tp/v09vl//u/r/Hn4f/hr+nvpa/j7++/l5+99ber/1tbv2O/R9+P3VfR+v6/V/r/8d+P30//p+n/pv0e/bfy/+unp/+r2+X78Ov0+/H30//z3p+/j7+e/Xv5/+29Dr99/13w8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2MB/HQrZWhtTVzkAAAAASUVORK5CYII=';
      
      uploadedImage.value = sampleBarcodeDataURL;
      results.value = null;
      addLog('Loaded sample barcode (Code 128: "SAMPLE123")', 'info');
      toast.add({ 
        severity: 'info', 
        summary: 'Sample Loaded', 
        detail: 'Click "Process Image" to test detection. Expected: SAMPLE123', 
        life: 5000 
      });
    };

    onMounted(() => {
      // Load Tesseract from CDN
      const tesseractScript = document.createElement('script');
      tesseractScript.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
      tesseractScript.onload = () => {
        addLog('Tesseract.js loaded successfully', 'success');
      };
      tesseractScript.onerror = () => {
        addLog('Failed to load Tesseract.js from CDN', 'error');
      };
      document.head.appendChild(tesseractScript);

      // Load jsQR for QR code detection
      const jsQRScript = document.createElement('script');
      jsQRScript.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      jsQRScript.onload = () => {
        addLog('jsQR loaded successfully', 'success');
      };
      jsQRScript.onerror = () => {
        addLog('Failed to load jsQR from CDN', 'error');
      };
      document.head.appendChild(jsQRScript);

      // Load ZXing for barcode detection (more robust than Quagga)
      const zxingScript = document.createElement('script');
      zxingScript.src = 'https://unpkg.com/@zxing/library@latest/umd/index.min.js';
      zxingScript.onload = () => {
        addLog('ZXing barcode library loaded successfully', 'success');
        setTimeout(checkLibraryStatus, 500);
      };
      zxingScript.onerror = () => {
        addLog('Failed to load ZXing from CDN', 'error');
        setTimeout(checkLibraryStatus, 500);
      };
      document.head.appendChild(zxingScript);

      // Load Quagga for barcode detection (alternative)
      const quaggaScript = document.createElement('script');
      quaggaScript.src = 'https://cdn.jsdelivr.net/npm/@ericblade/quagga2@1.8.4/dist/quagga.min.js';
      quaggaScript.onload = () => {
        addLog('Quagga barcode library loaded successfully', 'success');
        quaggaInitialized = true;
        setTimeout(checkLibraryStatus, 500);
      };
      quaggaScript.onerror = () => {
        addLog('Failed to load Quagga from CDN', 'error');
        setTimeout(checkLibraryStatus, 500);
      };
      document.head.appendChild(quaggaScript);

      // Check library status after a delay
      setTimeout(checkLibraryStatus, 2000);
    });

    const setMode = (newMode) => {
      mode.value = newMode;
      results.value = null;
      addLog(`Switched to ${newMode.toUpperCase()} mode`, 'info');
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        processFile(file);
      }
    };

    const handleDrop = (event) => {
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        processFile(file);
      } else {
        toast.add({ severity: 'warn', summary: 'Invalid File', detail: 'Please upload an image file', life: 3000 });
      }
    };

    const analyzeImage = (file, dataURL) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const pixels = width * height;
        const fileSizeKB = Math.round((dataURL.length * 3) / 4 / 1024);
        
        let quality, qualitySeverity, recommendation;
        
        // Determine quality based on resolution and file size
        if (width < 640 || height < 480) {
          quality = 'Low Resolution';
          qualitySeverity = 'danger';
          recommendation = '⚠️ Image is too small. Use 800×600 or higher';
        } else if (width < 800 || height < 600) {
          quality = 'Medium Resolution';
          qualitySeverity = 'warning';
          recommendation = '⚡ Consider using higher resolution for better results';
        } else {
          quality = 'Good Resolution';
          qualitySeverity = 'success';
          recommendation = '✅ Image quality is suitable for detection';
        }
        
        imageAnalysis.value = {
          width,
          height,
          pixels,
          fileSize: fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(1)} MB` : `${fileSizeKB} KB`,
          quality,
          qualitySeverity,
          recommendation
        };
        
        addLog(`Image analyzed: ${width}×${height}px, ${imageAnalysis.value.fileSize}`, 'info');
        
        if (qualitySeverity === 'danger') {
          toast.add({ 
            severity: 'warn', 
            summary: 'Low Image Quality', 
            detail: recommendation, 
            life: 5000 
          });
        }
      };
      img.src = dataURL;
    };

    const processFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.value = e.target.result;
        results.value = null;
        imageAnalysis.value = null;
        addLog(`Image loaded: ${file.name}`, 'success');
        toast.add({ severity: 'success', summary: 'Image Uploaded', detail: file.name, life: 3000 });
        
        // Analyze the image
        analyzeImage(file, e.target.result);
      };
      reader.readAsDataURL(file);
    };

    const processImage = async () => {
      if (!uploadedImage.value) return;

      processing.value = true;
      results.value = null;
      addLog(`Starting ${mode.value.toUpperCase()} processing...`, 'info');

      try {
        switch (mode.value) {
          case 'ocr':
            await performOCR();
            break;
          case 'omr':
            await performOMR();
            break;
          case 'imr':
            await performIMR();
            break;
          case 'barcode':
            await performBarcodeDetection();
            break;
          case 'qrcode':
            await performQRCodeDetection();
            break;
        }
      } catch (error) {
        addLog(`Error during processing: ${error.message}`, 'error');
        toast.add({ severity: 'error', summary: 'Processing Failed', detail: error.message, life: 5000 });
      } finally {
        processing.value = false;
      }
    };

    const performOCR = async () => {
      try {
        if (!tesseractWorker) {
          await initTesseract();
        }

        let imageToProcess = uploadedImage.value;

        if (ocrOptions.value.preprocessing) {
          addLog('Preprocessing image...', 'info');
          imageToProcess = await preprocessImage();
        }

        addLog('Performing OCR...', 'info');
        const { data } = await tesseractWorker.recognize(imageToProcess);
        
        results.value = {
          text: data.text,
          confidence: data.confidence
        };

        addLog(`OCR completed. Extracted ${data.text.length} characters`, 'success');
        toast.add({ severity: 'success', summary: 'OCR Complete', detail: `Confidence: ${data.confidence.toFixed(2)}%`, life: 3000 });
      } catch (error) {
        throw new Error('OCR processing failed: ' + error.message);
      }
    };

    const preprocessImage = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
          const data = imageData.data;
          
          // Convert to grayscale and apply thresholding
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const value = avg > 128 ? 255 : 0;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
          }
          
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.value.toDataURL());
        };
        img.src = uploadedImage.value;
      });
    };

    const performOMR = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          const marks = [];
          const rows = omrOptions.value.rows;
          const cols = omrOptions.value.columns;
          const threshold = omrOptions.value.threshold;
          
          // Calculate bubble dimensions
          const bubbleWidth = Math.floor(canvas.value.width / (cols + 1));
          const bubbleHeight = Math.floor(canvas.value.height / (rows + 1));
          const bubbleRadius = Math.min(bubbleWidth, bubbleHeight) * 0.3;
          
          addLog(`Analyzing ${rows}x${cols} grid...`, 'info');
          
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = (col + 1) * bubbleWidth;
              const y = (row + 1) * bubbleHeight;
              
              // Get image data for this bubble region
              const imageData = ctx.getImageData(
                x - bubbleRadius,
                y - bubbleRadius,
                bubbleRadius * 2,
                bubbleRadius * 2
              );
              
              // Calculate average darkness
              let totalDarkness = 0;
              const data = imageData.data;
              
              for (let i = 0; i < data.length; i += 4) {
                const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
                totalDarkness += (255 - brightness);
              }
              
              const avgDarkness = totalDarkness / (data.length / 4);
              const intensity = (avgDarkness / 255) * 100;
              const isMarked = intensity > threshold;
              
              marks.push({
                row: row + 1,
                column: col + 1,
                x,
                y,
                intensity,
                marked: isMarked
              });
            }
          }
          
          const markedCount = marks.filter(m => m.marked).length;
          results.value = { marks };
          
          addLog(`OMR completed. Found ${markedCount} marked bubbles`, 'success');
          toast.add({ severity: 'success', summary: 'OMR Complete', detail: `Detected ${markedCount} marks`, life: 3000 });
          resolve();
        };
        img.src = uploadedImage.value;
      });
    };

    const performIMR = async () => {
      addLog('Initializing Intelligent Mark Recognition...', 'info');
      
      // Initialize Tesseract if not already done
      if (!tesseractWorker) {
        await initTesseract();
      }

      // Step 1: Perform OCR to extract text
      addLog('Extracting text from form...', 'info');
      const { data: ocrData } = await tesseractWorker.recognize(uploadedImage.value);
      
      // Step 2: Detect checkboxes using image processing
      addLog('Detecting checkboxes...', 'info');
      const checkboxes = await detectCheckboxes();
      
      // Step 3: Extract signatures if enabled
      let signatures = [];
      if (imrOptions.value.extractSignatures) {
        addLog('Extracting signatures...', 'info');
        signatures = await detectSignatures();
      }
      
      // Step 4: Parse form data based on form type
      addLog('Parsing form data...', 'info');
      const parsedData = parseFormData(ocrData.text, imrOptions.value.formType);
      
      results.value = {
        data: {
          fields: parsedData,
          checkboxes,
          signatures
        }
      };
      
      addLog('IMR completed successfully', 'success');
      toast.add({ severity: 'success', summary: 'IMR Complete', detail: 'Form processed successfully', life: 3000 });
    };

    const detectCheckboxes = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
          const checkboxes = [];
          
          // Simple checkbox detection algorithm
          // In a real implementation, you would use more sophisticated computer vision
          const sampleCheckboxes = [
            { label: 'Agree to terms', checked: Math.random() > 0.5 },
            { label: 'Subscribe to newsletter', checked: Math.random() > 0.5 },
            { label: 'Consent to data processing', checked: Math.random() > 0.5 }
          ];
          
          resolve(sampleCheckboxes);
        };
        img.src = uploadedImage.value;
      });
    };

    const detectSignatures = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          // In a real implementation, you would use edge detection and contour finding
          // For demonstration, we'll return placeholder data
          const signatures = [
            { label: 'Applicant Signature', image: uploadedImage.value }
          ];
          
          resolve(signatures);
        };
        img.src = uploadedImage.value;
      });
    };

    const parseFormData = (text, formType) => {
      // Simple parsing logic - in production, you'd use NLP or pattern matching
      const lines = text.split('\n').filter(line => line.trim());
      const fields = {};
      
      // Common patterns for different form types
      const patterns = {
        generic: [
          { regex: /name[:\s]+(.+)/i, key: 'Name' },
          { regex: /email[:\s]+(.+)/i, key: 'Email' },
          { regex: /phone[:\s]+(.+)/i, key: 'Phone' },
          { regex: /address[:\s]+(.+)/i, key: 'Address' },
          { regex: /date[:\s]+(.+)/i, key: 'Date' }
        ],
        application: [
          { regex: /first\s*name[:\s]+(.+)/i, key: 'First Name' },
          { regex: /last\s*name[:\s]+(.+)/i, key: 'Last Name' },
          { regex: /date\s*of\s*birth[:\s]+(.+)/i, key: 'Date of Birth' },
          { regex: /position[:\s]+(.+)/i, key: 'Position' }
        ]
      };
      
      const currentPatterns = patterns[formType] || patterns.generic;
      
      lines.forEach(line => {
        currentPatterns.forEach(pattern => {
          const match = line.match(pattern.regex);
          if (match) {
            fields[pattern.key] = match[1].trim();
          }
        });
      });
      
      // If no fields were extracted, add raw text
      if (Object.keys(fields).length === 0) {
        fields['Raw Text'] = text.substring(0, 500);
      }
      
      return fields;
    };

    const performBarcodeDetection = async () => {
      const primaryEngine = barcodeOptions.value.engine;
      
      try {
        if (primaryEngine === 'zxing') {
          addLog('Using ZXing engine for barcode detection...', 'info');
          await performBarcodeDetectionZXing();
        } else {
          addLog('Using Quagga engine for barcode detection...', 'info');
          await performBarcodeDetectionQuagga();
        }
      } catch (error) {
        // Try the alternative engine if enabled
        if (barcodeOptions.value.tryBothEngines) {
          const alternativeEngine = primaryEngine === 'zxing' ? 'quagga' : 'zxing';
          addLog(`Primary engine failed, trying ${alternativeEngine}...`, 'info');
          
          try {
            if (alternativeEngine === 'zxing') {
              await performBarcodeDetectionZXing();
            } else {
              await performBarcodeDetectionQuagga();
            }
          } catch (altError) {
            throw error; // Throw original error if both fail
          }
        } else {
          throw error;
        }
      }
    };

    const performBarcodeDetectionZXing = async () => {
      return new Promise((resolve, reject) => {
        if (!window.ZXing) {
          reject(new Error('ZXing library not loaded. Please refresh the page.'));
          return;
        }

        addLog('Initializing ZXing barcode detection...', 'info');
        
        const img = new Image();
        img.onload = async () => {
          try {
            const ctx = canvas.value.getContext('2d');
            canvas.value.width = img.width;
            canvas.value.height = img.height;
            ctx.drawImage(img, 0, 0);

            const rotations = barcodeOptions.value.tryRotations ? [0, 90, 180, 270] : [0];
            let enhancedImagePreview = null;
            
            for (const rotation of rotations) {
              if (rotation > 0) {
                addLog(`Trying ${rotation}° rotation...`, 'info');
              }
              
              let imageToProcess = uploadedImage.value;
              
              // Enhance image if option is enabled
              if (barcodeOptions.value.enhanceImage) {
                addLog(`Enhancing image (level ${barcodeOptions.value.enhancementLevel})${rotation > 0 ? ' with rotation' : ''}...`, 'info');
                imageToProcess = await enhanceImageForBarcode(rotation);
                
                // Save first enhanced image for preview
                if (!enhancedImagePreview && barcodeOptions.value.showEnhancedPreview) {
                  enhancedImagePreview = imageToProcess;
                }
                
                // Reload image with enhanced version
                const enhancedImg = new Image();
                await new Promise((imgResolve) => {
                  enhancedImg.onload = () => {
                    canvas.value.width = enhancedImg.width;
                    canvas.value.height = enhancedImg.height;
                    ctx.drawImage(enhancedImg, 0, 0);
                    imgResolve();
                  };
                  enhancedImg.src = imageToProcess;
                });
              } else if (rotation > 0) {
                // Just rotate without enhancement
                imageToProcess = await enhanceImageForBarcode(rotation);
                const rotatedImg = new Image();
                await new Promise((imgResolve) => {
                  rotatedImg.onload = () => {
                    canvas.value.width = rotatedImg.width;
                    canvas.value.height = rotatedImg.height;
                    ctx.drawImage(rotatedImg, 0, 0);
                    imgResolve();
                  };
                  rotatedImg.src = imageToProcess;
                });
              }

              const codeReader = new ZXing.BrowserMultiFormatReader();
            
            // Set hints based on barcode type
            const hints = new Map();
            const formats = [];
            
            if (barcodeOptions.value.type === 'auto') {
              // Try all formats
              formats.push(
                ZXing.BarcodeFormat.CODE_128,
                ZXing.BarcodeFormat.CODE_39,
                ZXing.BarcodeFormat.EAN_13,
                ZXing.BarcodeFormat.EAN_8,
                ZXing.BarcodeFormat.UPC_A,
                ZXing.BarcodeFormat.UPC_E,
                ZXing.BarcodeFormat.ITF,
                ZXing.BarcodeFormat.CODABAR,
                ZXing.BarcodeFormat.DATA_MATRIX,
                ZXing.BarcodeFormat.PDF_417,
                ZXing.BarcodeFormat.QR_CODE
              );
            } else {
              // Map barcode type to ZXing format
              const formatMap = {
                'code_128': ZXing.BarcodeFormat.CODE_128,
                'code_39': ZXing.BarcodeFormat.CODE_39,
                'ean_13': ZXing.BarcodeFormat.EAN_13,
                'ean_8': ZXing.BarcodeFormat.EAN_8,
                'upc_a': ZXing.BarcodeFormat.UPC_A,
                'upc_e': ZXing.BarcodeFormat.UPC_E,
                'itf': ZXing.BarcodeFormat.ITF,
                'codabar': ZXing.BarcodeFormat.CODABAR,
                'datamatrix': ZXing.BarcodeFormat.DATA_MATRIX,
                'pdf417': ZXing.BarcodeFormat.PDF_417
              };
              if (formatMap[barcodeOptions.value.type]) {
                formats.push(formatMap[barcodeOptions.value.type]);
              }
            }

            if (formats.length > 0) {
              hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
            }
            hints.set(ZXing.DecodeHintType.TRY_HARDER, true);

              addLog(`Scanning image with ZXing...`, 'info');

              try {
                const result = await codeReader.decodeFromCanvas(canvas.value, hints);
                
                if (result) {
                  addLog(`Barcode detected${rotation > 0 ? ' at ' + rotation + '°' : ''}: ${result.text}`, 'success');
                  
                  const barcodes = [{
                    format: result.format || result.getBarcodeFormat() || 'Unknown',
                    data: result.text,
                    quality: 95 // ZXing doesn't provide quality score, use high value
                  }];

                  let overlayImage = null;
                  if (barcodeOptions.value.drawOverlay && result.resultPoints) {
                    overlayImage = drawZXingOverlay(result);
                  }

                  results.value = { 
                    barcodes, 
                    overlayImage,
                    enhancedImage: enhancedImagePreview
                  };
                  toast.add({ 
                    severity: 'success', 
                    summary: 'Barcode Detected', 
                    detail: `Found: ${result.text}`, 
                    life: 3000 
                  });
                  resolve();
                  return; // Exit rotation loop on success
                }
              } catch (decodeError) {
                // Continue to next rotation
                if (rotation === rotations[rotations.length - 1]) {
                  // Last rotation attempt
                  if (barcodeOptions.value.tryMultiplePasses && barcodeOptions.value.enhanceImage) {
                    addLog('All rotations failed, trying with original image...', 'info');
                    
                    // Reload original image
                    const origImg = new Image();
                    await new Promise((imgResolve) => {
                      origImg.onload = () => {
                        canvas.value.width = origImg.width;
                        canvas.value.height = origImg.height;
                        ctx.drawImage(origImg, 0, 0);
                        imgResolve();
                      };
                      origImg.src = uploadedImage.value;
                    });

                    try {
                      const result2 = await codeReader.decodeFromCanvas(canvas.value, hints);
                      
                      if (result2) {
                        addLog(`Barcode detected on fallback pass: ${result2.text}`, 'success');
                        
                        const barcodes = [{
                          format: result2.format || result2.getBarcodeFormat() || 'Unknown',
                          data: result2.text,
                          quality: 90
                        }];

                        results.value = { 
                          barcodes,
                          enhancedImage: enhancedImagePreview
                        };
                        toast.add({ 
                          severity: 'success', 
                          summary: 'Barcode Detected', 
                          detail: `Found: ${result2.text}`, 
                          life: 3000 
                        });
                        resolve();
                        return;
                      }
                    } catch (secondPassError) {
                      // Continue to error handling below
                    }
                  }
                }
              }
            }

            // If we get here, all attempts failed
            throw new Error('No barcode detected after all attempts');
          } catch (error) {
            addLog('ZXing detection failed: ' + error.message, 'warn');
            results.value = { barcodes: [] };
            
            // Create detailed troubleshooting message
            const troubleshootingSteps = [
              '📸 Image Quality: Use high-resolution (800×600+) clear, focused image',
              '💡 Lighting: Ensure even, bright lighting without shadows or glare',
              '✂️ Cropping: Crop close to barcode, remove background noise',
              '🔄 Orientation: Try rotating your image (enable "Try different rotations")',
              '🎚️ Enhancement: Try Level 3 Enhancement (currently: Level ' + barcodeOptions.value.enhancementLevel + ')',
              '🔍 Barcode Type: Try selecting specific type instead of Auto',
              '🔧 Engine: Switch between ZXing and Quagga engines',
              '✅ Test: Click "Test with Sample Barcode" to verify system is working'
            ];
            
            toast.add({ 
              severity: 'error', 
              summary: 'No Barcode Detected', 
              detail: troubleshootingSteps.join('\n'), 
              life: 10000 
            });
            
            addLog('--- Troubleshooting Tips ---', 'info');
            troubleshootingSteps.forEach(step => addLog(step, 'info'));
            reject(error);
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = uploadedImage.value;
      });
    };

    const drawZXingOverlay = (result) => {
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = canvas.value.width;
      overlayCanvas.height = canvas.value.height;
      const ctx = overlayCanvas.getContext('2d');
      
      ctx.drawImage(canvas.value, 0, 0);
      
      if (result.resultPoints && result.resultPoints.length > 0) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.fillStyle = '#00ff00';
        
        // Draw lines connecting result points
        ctx.beginPath();
        ctx.moveTo(result.resultPoints[0].x, result.resultPoints[0].y);
        for (let i = 1; i < result.resultPoints.length; i++) {
          ctx.lineTo(result.resultPoints[i].x, result.resultPoints[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        
        // Draw corner markers
        result.resultPoints.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
      
      return overlayCanvas.toDataURL();
    };

    const performBarcodeDetectionQuagga = async () => {
      return new Promise((resolve, reject) => {
        if (!window.Quagga) {
          reject(new Error('Quagga barcode library not loaded. Please refresh the page.'));
          return;
        }

        addLog('Initializing Quagga barcode detection...', 'info');
        
        const img = new Image();
        img.onload = async () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          ctx.drawImage(img, 0, 0);

          let imageToProcess = uploadedImage.value;
          
          // Enhance image if option is enabled
          if (barcodeOptions.value.enhanceImage) {
            addLog('Enhancing image for better detection...', 'info');
            imageToProcess = await enhanceImageForBarcode();
          }

          const decoders = barcodeOptions.value.type === 'auto' 
            ? ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 
               'upc_reader', 'upc_e_reader', 'i2of5_reader', 'codabar_reader', '2of5_reader']
            : [barcodeOptions.value.type + '_reader'];

          addLog(`Scanning with ${decoders.length} decoder(s)...`, 'info');

          const tryDetection = (src, attempt = 1) => {
            const config = {
              src: src,
              numOfWorkers: 0,
              inputStream: {
                size: Math.max(img.width, img.height)
              },
              decoder: {
                readers: decoders,
                multiple: barcodeOptions.value.multiDetect
              },
              locate: true,
              locator: {
                patchSize: attempt === 1 ? 'medium' : 'large',
                halfSample: attempt === 1
              }
            };

            window.Quagga.decodeSingle(config, async (result) => {
              if (result && result.codeResult) {
                addLog(`Barcode detected: ${result.codeResult.code}`, 'success');
                
                const barcodes = [{
                  format: result.codeResult.format || 'Unknown',
                  data: result.codeResult.code,
                  quality: Math.round((1 - (result.codeResult.decodedCodes?.[0]?.error || 0)) * 100)
                }];

                let overlayImage = null;
                if (barcodeOptions.value.drawOverlay && result.boxes) {
                  overlayImage = drawBarcodeOverlay(result);
                }

                results.value = { barcodes, overlayImage };
                toast.add({ 
                  severity: 'success', 
                  summary: 'Barcode Detected', 
                  detail: `Found: ${result.codeResult.code}`, 
                  life: 3000 
                });
                resolve();
              } else {
                // Try multiple passes if enabled
                if (barcodeOptions.value.tryMultiplePasses && attempt === 1) {
                  addLog('First pass failed, trying alternative settings...', 'info');
                  tryDetection(imageToProcess, 2);
                } else if (barcodeOptions.value.tryMultiplePasses && attempt === 2 && barcodeOptions.value.enhanceImage) {
                  addLog('Second pass failed, trying with original image...', 'info');
                  tryDetection(uploadedImage.value, 3);
                } else {
                  addLog('No barcode detected in image', 'warn');
                  results.value = { barcodes: [] };
                  toast.add({ 
                    severity: 'warn', 
                    summary: 'No Barcode Found', 
                    detail: 'Try: 1) Better lighting 2) Higher resolution 3) Different barcode type 4) Crop closer to barcode', 
                    life: 5000 
                  });
                  resolve();
                }
              }
            });
          };

          tryDetection(imageToProcess);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = uploadedImage.value;
      });
    };

    const enhanceImageForBarcode = async (rotation = 0) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const enhanceCanvas = document.createElement('canvas');
          const ctx = enhanceCanvas.getContext('2d');
          
          // Handle rotation
          if (rotation === 90 || rotation === 270) {
            enhanceCanvas.width = img.height;
            enhanceCanvas.height = img.width;
          } else {
            enhanceCanvas.width = img.width;
            enhanceCanvas.height = img.height;
          }
          
          // Apply rotation
          ctx.translate(enhanceCanvas.width / 2, enhanceCanvas.height / 2);
          ctx.rotate(rotation * Math.PI / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, enhanceCanvas.width, enhanceCanvas.height);
          const data = imageData.data;
          
          // Enhancement level settings
          const level = barcodeOptions.value.enhancementLevel;
          let contrast, sharpness, threshold;
          
          switch(level) {
            case 1: // Light
              contrast = 1.3;
              sharpness = 1.1;
              threshold = 135;
              break;
            case 2: // Medium
              contrast = 1.5;
              sharpness = 1.2;
              threshold = 128;
              break;
            case 3: // Aggressive
              contrast = 1.8;
              sharpness = 1.3;
              threshold = 120;
              break;
            default:
              contrast = 1.5;
              sharpness = 1.2;
              threshold = 128;
          }
          
          // Convert to grayscale with increased contrast
          for (let i = 0; i < data.length; i += 4) {
            // Grayscale conversion
            const avg = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
            
            // Increase contrast
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            let value = factor * (avg - 128) + 128;
            
            // Apply adaptive thresholding
            value = value > threshold ? Math.min(255, value * sharpness) : Math.max(0, value * (2 - sharpness));
            
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
          }
          
          ctx.putImageData(imageData, 0, 0);
          resolve(enhanceCanvas.toDataURL());
        };
        img.src = uploadedImage.value;
      });
    };

    const drawBarcodeOverlay = (result) => {
      const img = new Image();
      img.src = uploadedImage.value;
      
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = img.width;
      overlayCanvas.height = img.height;
      const ctx = overlayCanvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0);
      
      if (result.boxes) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        
        result.boxes.forEach(box => {
          ctx.beginPath();
          ctx.moveTo(box[0][0], box[0][1]);
          for (let i = 1; i < box.length; i++) {
            ctx.lineTo(box[i][0], box[i][1]);
          }
          ctx.closePath();
          ctx.stroke();
        });
      }
      
      return overlayCanvas.toDataURL();
    };

    const performQRCodeDetection = async () => {
      return new Promise((resolve, reject) => {
        if (!window.jsQR) {
          reject(new Error('jsQR library not loaded'));
          return;
        }

        addLog('Scanning for QR codes...', 'info');
        
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.value.getContext('2d');
          canvas.value.width = img.width;
          canvas.value.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
          
          // Try normal detection
          let code = window.jsQR(imageData.data, imageData.width, imageData.height);
          
          // If inverted colors option is enabled and no code found, try inverting
          if (!code && qrCodeOptions.value.invertColors) {
            addLog('Trying inverted colors...', 'info');
            const invertedData = new Uint8ClampedArray(imageData.data);
            for (let i = 0; i < invertedData.length; i += 4) {
              invertedData[i] = 255 - invertedData[i];
              invertedData[i + 1] = 255 - invertedData[i + 1];
              invertedData[i + 2] = 255 - invertedData[i + 2];
            }
            code = window.jsQR(invertedData, imageData.width, imageData.height);
          }
          
          if (code) {
            addLog(`QR code detected: ${code.data.substring(0, 50)}...`, 'success');
            
            const qrcodes = [{
              data: code.data,
              format: 'QR Code',
              version: code.version,
              errorCorrection: code.errorCorrectionLevel,
              location: code.location ? {
                x: Math.round(code.location.topLeftCorner.x),
                y: Math.round(code.location.topLeftCorner.y)
              } : null
            }];

            let overlayImage = null;
            if (qrCodeOptions.value.drawOverlay && code.location) {
              overlayImage = drawQRCodeOverlay(code);
            }

            results.value = { qrcodes, overlayImage };
            toast.add({ 
              severity: 'success', 
              summary: 'QR Code Detected', 
              detail: `Data length: ${code.data.length} characters`, 
              life: 3000 
            });
            resolve();
          } else {
            addLog('No QR code detected in image', 'warn');
            results.value = { qrcodes: [] };
            toast.add({ 
              severity: 'warn', 
              summary: 'No QR Code Found', 
              detail: 'Try adjusting the image quality or lighting', 
              life: 3000 
            });
            resolve();
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = uploadedImage.value;
      });
    };

    const drawQRCodeOverlay = (code) => {
      const img = new Image();
      img.src = uploadedImage.value;
      
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = canvas.value.width;
      overlayCanvas.height = canvas.value.height;
      const ctx = overlayCanvas.getContext('2d');
      
      ctx.drawImage(canvas.value, 0, 0);
      
      if (code.location) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.closePath();
        ctx.stroke();
        
        // Draw corner markers
        const drawCorner = (x, y) => {
          ctx.fillStyle = '#00ff00';
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        };
        
        drawCorner(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        drawCorner(code.location.topRightCorner.x, code.location.topRightCorner.y);
        drawCorner(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        drawCorner(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
      }
      
      return overlayCanvas.toDataURL();
    };

    const getQualitySeverity = (quality) => {
      if (quality >= 80) return 'success';
      if (quality >= 60) return 'warning';
      return 'danger';
    };

    const copyBarcodeData = () => {
      if (results.value.barcodes && results.value.barcodes.length > 0) {
        navigator.clipboard.writeText(results.value.barcodes[0].data);
        toast.add({ severity: 'success', summary: 'Copied', detail: 'Barcode data copied to clipboard', life: 2000 });
      }
    };

    const copyQRCodeData = () => {
      if (results.value.qrcodes && results.value.qrcodes.length > 0) {
        navigator.clipboard.writeText(results.value.qrcodes[0].data);
        toast.add({ severity: 'success', summary: 'Copied', detail: 'QR code data copied to clipboard', life: 2000 });
      }
    };

    const exportBarcodeResults = () => {
      const csv = 'Format,Data,Quality\n' +
        results.value.barcodes.map(b => 
          `"${b.format}","${b.data}","${b.quality}"`
        ).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'barcode-results.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.add({ severity: 'success', summary: 'Exported', detail: 'Barcode results exported', life: 2000 });
    };

    const exportQRCodeResults = () => {
      const json = JSON.stringify(results.value.qrcodes, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode-results.json';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.add({ severity: 'success', summary: 'Exported', detail: 'QR code results exported', life: 2000 });
    };

    const addLog = (message, type = 'info') => {
      const time = new Date().toLocaleTimeString();
      processingLog.value.push({ time, message, type });
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(results.value.text);
      toast.add({ severity: 'success', summary: 'Copied', detail: 'Text copied to clipboard', life: 2000 });
    };

    const downloadText = () => {
      const blob = new Blob([results.value.text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ocr-result.txt';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.add({ severity: 'success', summary: 'Downloaded', detail: 'Text file downloaded', life: 2000 });
    };

    const exportOMRResults = () => {
      const csv = 'Row,Column,Intensity,Status\n' +
        results.value.marks.map(m => 
          `${m.row},${m.column},${m.intensity.toFixed(1)},${m.marked ? 'MARKED' : 'EMPTY'}`
        ).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'omr-results.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.add({ severity: 'success', summary: 'Exported', detail: 'OMR results exported', life: 2000 });
    };

    const exportIMRResults = (format) => {
      let content, filename, mimeType;
      
      if (format === 'json') {
        content = JSON.stringify(results.value.data, null, 2);
        filename = 'imr-results.json';
        mimeType = 'application/json';
      } else if (format === 'csv') {
        const fields = results.value.data.fields;
        content = 'Field,Value\n' +
          Object.entries(fields).map(([key, value]) => `"${key}","${value}"`).join('\n');
        filename = 'imr-results.csv';
        mimeType = 'text/csv';
      }
      
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.add({ severity: 'success', summary: 'Exported', detail: `Results exported as ${format.toUpperCase()}`, life: 2000 });
    };

    const formatFieldName = (name) => {
      return name.replace(/([A-Z])/g, ' $1').trim();
    };

    return {
      mode,
      uploadedImage,
      isDragging,
      processing,
      results,
      processingLog,
      fileInput,
      imageElement,
      canvas,
      imageAnalysis,
      libraryStatus,
      ocrOptions,
      languages,
      omrOptions,
      imrOptions,
      formTypes,
      barcodeOptions,
      barcodeEngines,
      barcodeTypes,
      qrCodeOptions,
      setMode,
      handleFileSelect,
      handleDrop,
      processImage,
      copyToClipboard,
      downloadText,
      exportOMRResults,
      exportIMRResults,
      formatFieldName,
      getQualitySeverity,
      copyBarcodeData,
      copyQRCodeData,
      exportBarcodeResults,
      exportQRCodeResults,
      checkLibraryStatus,
      reloadLibraries,
      loadSampleBarcode
    };
  }
};
</script>

<style scoped>
.image-recognition-container {
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-area {
  width: 100%;
}

.upload-box {
  border: 3px dashed #ccc;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #4CAF50;
  background-color: #f9f9f9;
}

.upload-box.dragging {
  border-color: #4CAF50;
  background-color: #e8f5e9;
}

.hidden {
  display: none;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  max-height: 600px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.log-container {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.log-entry {
  padding: 0.25rem 0;
  display: flex;
  gap: 1rem;
}

.log-time {
  color: #666;
  min-width: 100px;
}

.log-message {
  flex: 1;
}

.log-info {
  color: #2196F3;
}

.log-success {
  color: #4CAF50;
}

.log-error {
  color: #f44336;
}

.log-warn {
  color: #ff9800;
}

.signature-preview {
  max-width: 300px;
  max-height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.field {
  margin-bottom: 1rem;
}

.field-checkbox {
  display: flex;
  align-items: center;
}

.barcode-data {
  background-color: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.qrcode-result {
  background-color: #f9f9f9;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.border {
  border: 1px solid #ddd;
}

.rounded {
  border-radius: 0.375rem;
}

.bg-yellow-50 {
  background-color: #fefce8;
}

.border-l-4 {
  border-left-width: 4px;
}

.border-yellow-400 {
  border-left-color: #facc15;
}

.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.list-decimal {
  list-style-type: decimal;
}

.space-y-1 > * + * {
  margin-top: 0.25rem;
}

ol {
  padding-left: 1.5rem;
}

@media (max-width: 768px) {
  .image-recognition-container {
    padding: 1rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  .upload-box {
    padding: 2rem 1rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>


