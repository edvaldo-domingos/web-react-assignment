
export const NAV_ITEMS = {
    users: {
        name: "brewers",
    },
    recipes: {
        name: "recipes"
    }
}

export const ACTION_BUTTONS = {
    delete: {
        name: "Delete"
    },
    edit: {
        name: "Edit"
    },

    save: {
        name: "Save"
    },
    create: {
        name: "Create"
    },
    yes: {
        name: "Yes"
    }
    ,
    cancel: {
        name: "Cancel"
    }
    ,
    back: {
        name: "Back"
    }
};



export const beanTypes = [
    {
      label: "Arabica",
      value: "arabica",
    },
    {
      label: "Robusta",
      value: "robusta",
    },
    {
      label: "Liberica",
      value: "liberica",
    },
    {
      label: "Excelsa",
      value: "excelsa",
    },
  ];

export const brewTypes = [
    {
      label: "Pour Over/Drip: Coffee Cone",
      value: "coffe_cone",
    },
    {
      label: "Pour Over/Drip: Chemex",
      value: "chemex",
    },
    {
      label: "Plunger/Press: French Press",
      value: "french",
    },
    {
      label: "Plunger/Press: AeroPress",
      value: "aeroPress",
    },
    {
      label: "Percolate: Stovetop Moka Pot",
      value: "stovetop",
    },
    {
      label: "Vacuum: Siphon",
      value: "siphon",
    },
  ];

export const RECIPES_BAS_ROUTE = "/recipes"
export const BREWERS_BAS_ROUTE = "/brewers"

export const BASE_API_URL = "http://localhost:8080";
export const BREWER_API_URL = `${BASE_API_URL}/brewers`;
export const RECIPE_API_URL = `${BASE_API_URL}/recipes`;

export const UI_ROUTES = {
  [NAV_ITEMS.recipes.name] : RECIPES_BAS_ROUTE,
  [NAV_ITEMS.users.name] : BREWERS_BAS_ROUTE
}