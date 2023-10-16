import ArticulosTab from "./ArticulosTab.svelte";
import OrdesTab from "./OrdesTab.svelte";
import PourchaserTab from "./PourchaserTab.svelte";

export const dashboardItems = [
  {
    id: 0,
    value: "articulos",
    component: ArticulosTab,
  },
  {
    id: 1,
    value: "ordenes",
    component: OrdesTab,
  },
  {
    id: 2,
    value: "facturador",
    component: PourchaserTab,
  },
];

