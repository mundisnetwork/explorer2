<script>
  import { useFocus } from "svelte-navigator";
  import { Search } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";

  import { HSplitPane, VSplitPane } from "svelte-split-pane";

  import { _ } from "../../i18n";
  import EventSchedule from "carbon-icons-svelte/lib/EventSchedule.svelte";
  import DataVis_1 from "carbon-icons-svelte/lib/DataVis_1.svelte";
  import Edit from "carbon-icons-svelte/lib/Edit.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import { onMount } from "svelte";
  import { watchResize } from "svelte-watch-resize";

  const registerFocus = useFocus();

  async function getTransactions() {
    // await refreshParts();
    // await refreshCustomers();
    var url = `/api/tx/`;
    console.log(`url = ${url}`);
    // if (searchValue && searchValue.length > 4) {
    //   url = `${url}&name=${searchValue}`;
    //   requestedAllReconciliationItems = false;
    // } else {
    //   requestedAllReconciliationItems = true;
    // }
    // const res = await fetch(url);
    // const data = await res.json();

    // if (res.ok) {
    //   promiseReconciliationItems = data.results;
    //   for (let i = 0; i < promiseReconciliationItems.length; i++) {
    //     const reconciliationItem = promiseReconciliationItems[i];
    //     reconciliationItem.code = {
    //       category: reconciliationItem.category,
    //       id: reconciliationItem.id,
    //     };
    //     reconciliationItem.value = {
    //       estimatedValue: reconciliationItem.estimatedValue,
    //       currency: reconciliationItem.currency,
    //     };
    //     reconciliationItem.history = {
    //       slides: [],
    //       data: [],
    //     };
    //   }
    //   totalItems = data.totalItems;
    //   currentPage = data.currentPage;
    // } else {
    //   throw new Error(data);
    // }
  }

  onMount(() => {
    getTransactions();
  });
</script>

<div
  id="supply-parent"
  class="supply-parent-sm overflow-y-auto xsm:supply-parent">
  <Grid padding>
    <Row>
      <Column sm={{ span: 4, offset: 0 }}>
        <Search
          placeholder="Search for blocks, accounts, transactions, programs and tokens" />
      </Column>
      <Column />
      <Column />
    </Row>
    <Row>
      <Column sm={{ span: 4, offset: 0 }}>
        <div>Live Cluster Stats</div>
        <div>Slot</div>
        <div>Block height</div>
        <div>Cluster time</div>
        <div>Slot time (1min average)</div>
      </Column>
      <Column />
      <Column />
    </Row>
  </Grid>
</div>

<style global lang="postcss">
  #supply-parent {
    padding: 1rem;
  }
</style>
