<script>
  import { useFocus } from "svelte-navigator";
  import { Search } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";
  import { Tile } from "carbon-components-svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";

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
  id="cluster-stats-parent"
  class="cluster-stats-parent-sm overflow-y-auto xsm:cluster-stats-parent">
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
      <Column>
        <Tile>Circulating supply</Tile>
      </Column>
      <Column>
        <Tile>Active Stake</Tile>
      </Column>
      <Column>
        <Tile>Price</Tile>
      </Column>
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
    <Row>
      <Column sm={{ span: 4, offset: 0 }}>
        <BarChartSimple
          data={[
            {
              group: "data",
              date: "2019-02-01T08:10:00.000Z",
              value: 10000,
            },
            {
              group: "data",
              date: "2019-02-01T08:12:04.000Z",
              value: 20001,
            },
            {
              group: "data",
              date: "2019-02-01T08:14:08.000Z",
              value: 10002,
            },
            {
              group: "data",
              date: "2019-02-01T08:15:08.000Z",
              value: 10062,
            },
            {
              group: "data",
              date: "2019-02-01T08:17:12.000Z",
              value: 30003,
            },
            {
              group: "data",
              date: "2019-02-01T08:18:16.000Z",
              value: 20004,
            },
            {
              group: "data",
              date: "2019-02-01T08:19:20.000Z",
              value: 10005,
            },
            {
              group: "data",
              date: "2019-02-01T08:22:24.000Z",
              value: 50006,
            },
            {
              group: "data",
              date: "2019-02-01T08:24:24.000Z",
              value: 20006,
            },
            {
              group: "data",
              date: "2019-02-01T08:26:28.000Z",
              value: 40007,
            },
            {
              group: "data",
              date: "2019-02-01T08:27:32.000Z",
              value: 30008,
            },
            {
              group: "data",
              date: "2019-02-01T08:30:36.000Z",
              value: 10000,
            },
            {
              group: "data",
              date: "2019-02-01T08:32:36.000Z",
              value: 10000,
            },
            {
              group: "data",
              date: "2019-02-01T08:35:40.000Z",
              value: 20000,
            },
            {
              group: "data",
              date: "2019-02-01T08:36:44.000Z",
              value: 10000,
            },
            {
              group: "data",
              date: "2019-02-01T08:37:48.000Z",
              value: 30000,
            },
            {
              group: "data",
              date: "2019-02-01T08:40:52.000Z",
              value: 10000,
            },
          ]}
          options={{
            title: "TPS histoy",
            axes: {
              left: {
                mapsTo: "value",
              },
              bottom: {
                mapsTo: "date",
                scaleType: "time",
              },
            },
            timeScale: {
              localeObject: {
                code: "tr",
                formatLong: {},
                localize: {},
                match: {},
                options: {
                  weekStartsOn: 1,
                  firstWeekContainsDate: 1,
                },
              },
            },
            bars: {
              maxWidth: 200,
            },
            color: {
              scale: {
                data: "#1dd79b",
              },
            },
            legend: {
              position: "left",
              orientation: "vertical",
            },
            height: "400px",
          }} />
      </Column>
      <Column />
      <Column />
    </Row>
  </Grid>
</div>

<style global lang="postcss">
  #cluster-stats-parent {
    padding: 1rem;
  }
</style>
