import { SUPPLY, CLUSTER_STATS, INSPECTOR } from "./paths";
import Supply from "../views/pages/Supply.svelte";
import ClusterStats from "../views/pages/ClusterStats.svelte";
import Inspector from "../views/pages/Inspector.svelte";

import FaCreativeCommonsSampling from "svelte-icons/fa/FaCreativeCommonsSampling.svelte";
import FaWpexplorer from "svelte-icons/fa/FaWpexplorer.svelte";
import FaQuestionCircle from "svelte-icons/fa/FaQuestionCircle.svelte";

export const routes = [
  {
    path: CLUSTER_STATS,
    component: ClusterStats,
    menu_key: "cluster_stats",
    icon: FaCreativeCommonsSampling,
    not_menu: false,
  },
  {
    path: SUPPLY,
    component: Supply,
    menu_key: "supply",
    icon: FaWpexplorer,
    not_menu: false,
  },
  {
    path: INSPECTOR,
    component: Inspector,
    menu_key: "inspector",
    icon: FaQuestionCircle,
    not_menu: false,
  },
];
