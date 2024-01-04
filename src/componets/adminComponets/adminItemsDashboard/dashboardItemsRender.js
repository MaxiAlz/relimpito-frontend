import ArticulosTab from "./ArticulosTab.svelte";
import OrdesTab from "./OrdesTab.svelte";
import PourchaserTab from "./PourchaserTab.svelte";
import Users from "./Users.svelte";

export const dashboardItems = [
  {
    id: 0,
    value: "articulos",
    component: ArticulosTab,
    icon: 'inventory'
  },
  {
    id: 1,
    value: "ordenes",
    component: OrdesTab,
    icon: 'orders'
  },
  {
    id: 2,
    value: "facturador",
    component: PourchaserTab,
    icon: 'order_play'
  },
  {
    id: 3,
    value: "Usuarios",
    component: Users,
    icon: 'group'
  },
  {
    id: 4,
    value: "Configurar",
    component: PourchaserTab,
    icon: 'settings'
  },
];

