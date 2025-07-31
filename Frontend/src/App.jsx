import { createBrowserRouter } from "react-router-dom"
import ProtectedRoute from "./ui/templates/protected-route/protected-route.template"
import PublicTemplate from "./ui/templates/public-template/public.template"
import PrivateTemplate from "./ui/templates/private-template/private.template"
import Login from "./ui/modules/Login/login.view"
import Home from "./ui/modules/Home/home.view"
import SignUp from "./ui/modules/Sign-Up/sign-up.view"
import BuildScreen from "./ui/modules/Build-Screen/build-screen.view"
import TransactionForm from "./ui/modules/Transaction-Form/transaction-form.view"
import GoalForm from "./ui/modules/Goal-Form/goal-form.view"
import CategoryForm from "./ui/modules/Category-Form/category-form.view"
import Transactions from "./ui/modules/Transaction/transactions.view"
import Goals from "./ui/modules/Goals/goals.view"
import AboutUs from "./ui/modules/About-Us/about-us.view"
import FAQ from "./ui/modules/FAQ/faq.view"

export const router = createBrowserRouter([
  {
    element: <PublicTemplate />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/forgot-password",
        element: <BuildScreen />
      },
      {
        path: "/recover-password",
        element: <BuildScreen />
      },
    ]
  },
  {
    element: 
      <ProtectedRoute>
        <PrivateTemplate />
      </ProtectedRoute>,
    children: [
      // Dashboard
      {
        index: true,
        element: <Home />
      },
      // Transactions
      {
        path: "/transactions",
        element: <Transactions />
      },
      {
        path: "/create-transaction",
        element: <TransactionForm />
      },
      {
        path: "/edit-transaction/:id",
        element: <TransactionForm />
      },
      // Goals
      {
        path: "/goals",
        element: <Goals />
      },
      {
        path: "/create-goal",
        element: <GoalForm />
      },
      {
        path: "/edit-goal/:id",
        element: <GoalForm />
      },
      // Historic
      {
        path: "/historic",
        element: <BuildScreen />
      },
      // Shopping Habits
      {
        path: "/habits",
        element: <BuildScreen />
      },
      // Categories
      {
        path: "/create-category",
        element: <CategoryForm />
      },
      {
        path: "/edit-category/:id",
        element: <CategoryForm />
      },
      // FAQ
      {
        path: "/faq",
        element: <FAQ />
      },
      // About us
      {
        path: "/about-us",
        element: <AboutUs />
      },
      // Profile
      {
        path: "/profile",
        element: <BuildScreen />
      },
    ]
  },
  {
    path: "*",
    element: <div>404 - Página não encontrada</div>
  }
])