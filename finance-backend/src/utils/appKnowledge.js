export const APP_KNOWLEDGE = {
  navigation: {
    dashboard: "/dashboard",
    settings: "/setttings",
    insights: "/insights",
    profile: "/settings#profile",
    transactions: "/transactionSettings",
    budgets: "/budgets",
    assistant: "/assitant",
  },

  features: {
    changeTheme: "Go to settings appearance section",
    changePassword: "do to settings chnage password button",
    updateProfile:
      "Go to settings profile section or click profile photo on dahsboard",
  },

  ui: {
    hasSidebar: false,
    hasTopNav: true,
    hasSettingsSections: ["Profile", "Appearance", "Account"],
  },
  dashboard: {
    description:
      " dash board is where u can add transactions delete and edit transactions you can also filter trasactions by data there also a drop down called manage finances where us can click and navigate to insights set budgets and also navigate to settings page",
  },

  settings: {
    description:
      "settings you have access to add a profile photo change your profile photo and also change your password set new budget and change app theme ",
  },

  managefinance: {
    description:
      "manage finance drop down you have access to see bugets and goals and set budget for specific spending catgerories",
  },

  addTransactions: {
    description:
      "to addTransactions first navigate to drop down to create a budget for the month then you can add transactions for the month",
  },
};
