
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
    yes: {
        name: "Yes"
    }
    ,
    cancel: {
        name: "Cancel"
    }
}

export const RECIPES_BAS_ROUTE = "/recipes"
export const BREWERS_BAS_ROUTE = "/brewers"

export const BASE_API_URL = "http://localhost:8080";
export const BREWER_API_URL = `${BASE_API_URL}/brewers`;
export const RECIPE_API_URL = `${BASE_API_URL}/recipes`;
