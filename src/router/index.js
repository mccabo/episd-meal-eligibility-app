import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/auth/LoginView.vue';
import SignupView from '../views/auth/SignupView.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Documentation from '../components/documentation.vue';
import TestResults from '../components/TestResults.vue';
import Todo from '../components/Todo.vue';
import UserManual from '../components/UserManual.vue';
import ImageRecognition from '../components/ImageRecognition.vue';
import UserProfile from '../components/UserProfile.vue';
import PermissionDemo from '../components/PermissionDemo.vue';
import UserManagement from '../components/UserManagement.vue';
import ReadMe from '../components/ReadMe.vue';
import EditLetters from '../components/EditLetters.vue';
import AIPrompt from '../components/AIPrompt.vue';
// Training Components
import TrainingView from '../views/TrainingView.vue';
import AudioLearning from '../components/AudioLearning.vue';
import VideoLearning from '../components/VideoLearning.vue';
import MindMap from '../components/MindMap.vue';
import FlashCards from '../components/FlashCards.vue';
import Quizzes from '../components/Quizzes.vue';

// route guard with local authentication
const requireAuth = (to, from, next) => {
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: Documentation,
  },
  {
    path: '/test-results',
    name: 'TestResults',
    component: TestResults,
    beforeEnter: requireAuth,
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    beforeEnter: requireAuth,
  },
  {
    path: '/user-manual',
    name: 'UserManual',
    component: UserManual,
    beforeEnter: requireAuth,
  },
  {
    path: '/image-recognition',
    name: 'ImageRecognition',
    component: ImageRecognition,
    beforeEnter: requireAuth,
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    beforeEnter: requireAuth,
  },
  {
    path: '/permissions-demo',
    name: 'PermissionDemo',
    component: PermissionDemo,
    beforeEnter: requireAuth,
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
    beforeEnter: requireAuth,
  },
  {
    path: '/readme',
    name: 'ReadMe',
    component: ReadMe,
    beforeEnter: requireAuth,
  },
  {
    path: '/edit-letters',
    name: 'EditLetters',
    component: EditLetters,
    beforeEnter: requireAuth,
    props: (route) => ({ userRole: route.query.role || 'user' }),
  },
  {
    path: '/ai-prompt',
    name: 'AIPrompt',
    component: AIPrompt,
    beforeEnter: requireAuth,
  },
  // Training Routes
  {
    path: '/training',
    name: 'Training',
    component: TrainingView,
    beforeEnter: requireAuth,
  },
  {
    path: '/training/audio',
    name: 'AudioLearning',
    component: AudioLearning,
    beforeEnter: requireAuth,
  },
  {
    path: '/training/video',
    name: 'VideoLearning',
    component: VideoLearning,
    beforeEnter: requireAuth,
  },
  {
    path: '/training/mindmap',
    name: 'MindMap',
    component: MindMap,
    beforeEnter: requireAuth,
  },
  {
    path: '/training/flashcards',
    name: 'FlashCards',
    component: FlashCards,
    beforeEnter: requireAuth,
  },
  {
    path: '/training/quizzes',
    name: 'Quizzes',
    component: Quizzes,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
