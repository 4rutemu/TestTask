<script lang="ts">
    import {BASE_URL, Currencies} from "../environment.ts";
    import {onMount} from "svelte";

    type Currency = {
        name: string;
        value: number | undefined;
    }

    let firstCurrency: Currency = {name: 'USD', value: 1};
    let secondCurrency: Currency = {name: 'RUB', value: undefined};
    let coef;

    let promise;

    async function getRates() {
        const res = await fetch(`${BASE_URL}${firstCurrency.name}`);

        if(res.ok){
            return await res.json().then((res) => {
                console.log(res.rates)
                coef = res.rates[secondCurrency.name];
            });
        } else {
            throw new Error('Request failed!')
        }
    }

    function changeFirstCurrencyData(){
        firstCurrency.value = secondCurrency.value / coef;
        firstCurrency = firstCurrency;
    }

    function changeSecondCurrencyData(){
        secondCurrency.value = firstCurrency.value * coef;
        secondCurrency = secondCurrency;
    }

    onMount(() => {
        promise = getRates().then(() => {
            changeSecondCurrencyData()
    })})
</script>


{#await promise}
    <p>loading...</p>
    {:then response}
    <div>
        <select bind:value={firstCurrency.name}
                on:change={() => {getRates().then(() => {
                   changeFirstCurrencyData()
                })}}
        >
            {#each Currencies as currency}
                <option>{currency}</option>
            {/each}
        </select>
        <input type="number" bind:value={firstCurrency.value}
               on:change={() => {
                   changeSecondCurrencyData()
               }
               }
        />
        <p>{firstCurrency.value}</p>
    </div>
    <div>
        <select bind:value={secondCurrency.name}
                on:change={() => {getRates().then(() => {
                   changeSecondCurrencyData()
                })}}
        >
            {#each Currencies as currency}
                <option>{currency}</option>
            {/each}
        </select>
        <input type="number" bind:value={secondCurrency.value}
               on:change={() => {
                   changeFirstCurrencyData()
               }
               }
        />
        <p>{secondCurrency.value}</p>
    </div>
{/await}




<style>

</style>