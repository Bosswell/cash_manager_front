export const sortingOptions = [
    {
        label: "Creation date - Ascending",
        value: "t.created_at,asc"
    },
    {
        label: "Creation date - Descending",
        value: "t.created_at,desc"
    },
    {
        label: "Position number - Ascending",
        value: "t.id,asc"
    },
    {
        label: "Position number - Descending",
        value: "t.id,desc"
    },
    {
        label: "Transaction type - Ascending",
        value: "tt.name,asc"
    },
    {
        label: "Transaction type - Descending",
        value: "tt.name,desc"
    },
]

export const defaultSorting = {
    label: "Creation date - Descending",
    value: "t.created_at,desc"
};