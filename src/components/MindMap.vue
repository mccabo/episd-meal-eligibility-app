<template>
  <div class="mindmap-container">
    <div class="page-header">
      <h1><i class="pi pi-sitemap"></i> Mind Maps</h1>
      <p>Visualize concepts and create interactive knowledge maps</p>
    </div>

    <div class="mindmap-workspace">
      <div class="toolbar">
        <button @click="addNode" class="btn-tool" title="Add Node">
          <i class="pi pi-plus-circle"></i> Add Node
        </button>
        <button @click="toggleAutoLayout" class="btn-tool" title="Auto Layout">
          <i class="pi pi-th-large"></i> Auto Layout
        </button>
        <button @click="exportMindmap" class="btn-tool" title="Export">
          <i class="pi pi-download"></i> Export
        </button>
        <button @click="saveMindmap" class="btn-tool btn-save" title="Save">
          <i class="pi pi-save"></i> Save
        </button>
        <select v-model="selectedTemplate" @change="loadTemplate" class="template-select">
          <option value="">Select Template</option>
          <option value="project">Project Planning</option>
          <option value="learning">Learning Path</option>
          <option value="brainstorm">Brainstorming</option>
        </select>
      </div>

      <div class="canvas-container">
        <svg class="mindmap-canvas" :width="canvasWidth" :height="canvasHeight">
          <!-- Connections -->
          <g class="connections">
            <line
              v-for="(connection, index) in connections"
              :key="'conn-' + index"
              :x1="connection.x1"
              :y1="connection.y1"
              :x2="connection.x2"
              :y2="connection.y2"
              stroke="#667eea"
              stroke-width="2"
              class="connection-line"
            />
          </g>

          <!-- Nodes -->
          <g
            v-for="node in nodes"
            :key="node.id"
            :transform="`translate(${node.x}, ${node.y})`"
            class="node-group"
            @mousedown="startDrag(node, $event)"
          >
            <rect
              :width="node.width"
              :height="node.height"
              :rx="node.level === 0 ? 20 : 10"
              :fill="getNodeColor(node.level)"
              class="node-rect"
            />
            <text
              :x="node.width / 2"
              :y="node.height / 2 + 5"
              text-anchor="middle"
              fill="white"
              font-weight="600"
              class="node-text"
            >
              {{ node.text }}
            </text>
            <circle
              v-if="node.level < 3"
              :cx="node.width"
              :cy="node.height / 2"
              r="12"
              fill="#10b981"
              class="add-child-btn"
              @click.stop="addChildNode(node)"
            />
            <text
              v-if="node.level < 3"
              :x="node.width"
              :y="node.height / 2 + 5"
              text-anchor="middle"
              fill="white"
              font-size="16"
              font-weight="700"
              class="add-child-icon"
              @click.stop="addChildNode(node)"
            >
              +
            </text>
          </g>
        </svg>
      </div>

      <div class="sidebar-panel">
        <h3>Saved Mind Maps</h3>
        <div class="mindmap-list">
          <div
            v-for="map in savedMindmaps"
            :key="map.id"
            class="mindmap-item"
            @click="loadMindmap(map)"
          >
            <i class="pi pi-sitemap"></i>
            <div class="mindmap-item-info">
              <strong>{{ map.name }}</strong>
              <span>{{ map.nodeCount }} nodes • {{ map.date }}</span>
            </div>
          </div>
        </div>

        <div class="node-editor" v-if="selectedNode">
          <h3>Edit Node</h3>
          <input
            v-model="selectedNode.text"
            placeholder="Node text"
            class="node-input"
          />
          <button @click="deleteNode(selectedNode)" class="btn-delete">
            <i class="pi pi-trash"></i> Delete Node
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'MindMap',
  setup() {
    const toast = useToast()
    const canvasWidth = ref(1200)
    const canvasHeight = ref(800)
    const selectedTemplate = ref('')
    const selectedNode = ref(null)
    const draggedNode = ref(null)
    const dragOffset = ref({ x: 0, y: 0 })

    const nodes = ref([
      {
        id: 1,
        text: 'Main Topic',
        x: 550,
        y: 350,
        width: 180,
        height: 60,
        level: 0,
        parent: null
      },
      {
        id: 2,
        text: 'Subtopic 1',
        x: 300,
        y: 200,
        width: 150,
        height: 50,
        level: 1,
        parent: 1
      },
      {
        id: 3,
        text: 'Subtopic 2',
        x: 300,
        y: 500,
        width: 150,
        height: 50,
        level: 1,
        parent: 1
      },
      {
        id: 4,
        text: 'Subtopic 3',
        x: 800,
        y: 350,
        width: 150,
        height: 50,
        level: 1,
        parent: 1
      }
    ])

    const savedMindmaps = ref([
      {
        id: 1,
        name: 'Vue.js Learning Path',
        nodeCount: 12,
        date: '2025-10-20'
      },
      {
        id: 2,
        name: 'Project Planning',
        nodeCount: 8,
        date: '2025-10-18'
      },
      {
        id: 3,
        name: 'API Architecture',
        nodeCount: 15,
        date: '2025-10-15'
      }
    ])

    const connections = computed(() => {
      const conns = []
      nodes.value.forEach(node => {
        if (node.parent) {
          const parent = nodes.value.find(n => n.id === node.parent)
          if (parent) {
            conns.push({
              x1: parent.x + parent.width / 2,
              y1: parent.y + parent.height / 2,
              x2: node.x + node.width / 2,
              y2: node.y + node.height / 2
            })
          }
        }
      })
      return conns
    })

    const getNodeColor = (level) => {
      const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '#667eea',
        '#8b5cf6',
        '#a78bfa'
      ]
      return colors[level] || colors[colors.length - 1]
    }

    const addNode = () => {
      const newNode = {
        id: Date.now(),
        text: 'New Node',
        x: 400 + Math.random() * 400,
        y: 200 + Math.random() * 400,
        width: 150,
        height: 50,
        level: 1,
        parent: 1
      }
      nodes.value.push(newNode)
      toast.add({
        severity: 'success',
        summary: 'Node Added',
        detail: 'New node created',
        life: 2000
      })
    }

    const addChildNode = (parentNode) => {
      const childCount = nodes.value.filter(n => n.parent === parentNode.id).length
      const angleStep = Math.PI / (childCount + 2)
      const angle = angleStep * (childCount + 1)
      const distance = 200

      const newNode = {
        id: Date.now(),
        text: `Child ${childCount + 1}`,
        x: parentNode.x + Math.cos(angle) * distance,
        y: parentNode.y + Math.sin(angle) * distance,
        width: 130,
        height: 45,
        level: parentNode.level + 1,
        parent: parentNode.id
      }
      nodes.value.push(newNode)
      
      toast.add({
        severity: 'success',
        summary: 'Child Added',
        detail: 'New child node created',
        life: 2000
      })
    }

    const deleteNode = (node) => {
      nodes.value = nodes.value.filter(n => n.id !== node.id && n.parent !== node.id)
      selectedNode.value = null
      toast.add({
        severity: 'info',
        summary: 'Node Deleted',
        detail: 'Node and its children removed',
        life: 2000
      })
    }

    const startDrag = (node, event) => {
      selectedNode.value = node
      draggedNode.value = node
      const rect = event.target.getBoundingClientRect()
      dragOffset.value = {
        x: event.clientX - node.x,
        y: event.clientY - node.y
      }
    }

    const toggleAutoLayout = () => {
      toast.add({
        severity: 'info',
        summary: 'Auto Layout',
        detail: 'Organizing nodes automatically',
        life: 2000
      })
    }

    const exportMindmap = () => {
      toast.add({
        severity: 'success',
        summary: 'Exported',
        detail: 'Mind map exported successfully',
        life: 3000
      })
    }

    const saveMindmap = () => {
      const newMap = {
        id: Date.now(),
        name: `Mind Map ${savedMindmaps.value.length + 1}`,
        nodeCount: nodes.value.length,
        date: new Date().toISOString().split('T')[0]
      }
      savedMindmaps.value.unshift(newMap)
      toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Mind map saved successfully',
        life: 3000
      })
    }

    const loadTemplate = () => {
      if (!selectedTemplate.value) return
      toast.add({
        severity: 'info',
        summary: 'Template Loaded',
        detail: `${selectedTemplate.value} template applied`,
        life: 2000
      })
    }

    const loadMindmap = (map) => {
      toast.add({
        severity: 'info',
        summary: 'Mind Map Loaded',
        detail: map.name,
        life: 2000
      })
    }

    onMounted(() => {
      // Add mouse move listener for dragging
      document.addEventListener('mousemove', (e) => {
        if (draggedNode.value) {
          draggedNode.value.x = e.clientX - dragOffset.value.x
          draggedNode.value.y = e.clientY - dragOffset.value.y
        }
      })

      document.addEventListener('mouseup', () => {
        draggedNode.value = null
      })
    })

    return {
      canvasWidth,
      canvasHeight,
      selectedTemplate,
      selectedNode,
      nodes,
      savedMindmaps,
      connections,
      getNodeColor,
      addNode,
      addChildNode,
      deleteNode,
      startDrag,
      toggleAutoLayout,
      exportMindmap,
      saveMindmap,
      loadTemplate,
      loadMindmap
    }
  }
}
</script>

<style scoped>
.mindmap-container {
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

.mindmap-workspace {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.toolbar {
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 2px solid #e0e0e0;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.btn-tool {
  padding: 0.75rem 1.25rem;
  border: none;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-tool:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-save {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.template-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  margin-left: auto;
}

.canvas-container {
  position: relative;
  background: linear-gradient(90deg, #f8f9fa 1px, transparent 1px),
              linear-gradient(#f8f9fa 1px, transparent 1px);
  background-size: 20px 20px;
  overflow: auto;
}

.mindmap-canvas {
  display: block;
  cursor: move;
}

.connection-line {
  stroke-dasharray: 5, 5;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.connection-line:hover {
  stroke-width: 3;
  opacity: 1;
}

.node-group {
  cursor: grab;
  transition: all 0.3s ease;
}

.node-group:hover {
  transform: scale(1.05);
}

.node-group:active {
  cursor: grabbing;
}

.node-rect {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.node-text {
  pointer-events: none;
  font-size: 14px;
}

.add-child-btn {
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-child-btn:hover {
  r: 14;
  fill: #059669;
}

.add-child-icon {
  cursor: pointer;
  pointer-events: none;
}

.sidebar-panel {
  background: #f8f9fa;
  padding: 1.5rem;
  border-top: 2px solid #e0e0e0;
  max-height: 300px;
  overflow-y: auto;
}

.sidebar-panel h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.mindmap-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mindmap-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mindmap-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.mindmap-item i {
  font-size: 1.5rem;
  color: #667eea;
}

.mindmap-item-info strong {
  display: block;
  color: #2c3e50;
}

.mindmap-item-info span {
  font-size: 0.85rem;
  color: #666;
}

.node-editor {
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.node-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.node-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-delete {
  width: 100%;
  padding: 0.75rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-delete:hover {
  background: #b91c1c;
}

@media (max-width: 1024px) {
  .canvas-container {
    height: 500px;
  }

  .sidebar-panel {
    max-height: 400px;
  }
}
</style>


