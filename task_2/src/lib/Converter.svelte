<script lang="ts">
    import {BASE_URL, Currencies} from "../environment.ts";
    import {onMount} from "svelte";

    type Currency = {
        name: string;
        value: number | undefined;
    }

    let firstCurrency: Currency = {name: 'ALL', value: 1};
    let secondCurrency: Currency = {name: 'RUB', value: 99.92481};

    let promise;

    async function getRates(firstCurrency, secondCurrency) {
        const res = await fetch(`${BASE_URL}${firstCurrency.name}`);

        if(res.ok){
            return await res.json().then((res) => {
                console.log(res.rates)
                secondCurrency.value = res.rates[secondCurrency.name] * firstCurrency.value;
                secondCurrency = {...secondCurrency};
            });
        } else {
            throw new Error('Request failed!')
        }
    }

    onMount(() => {
        promise = getRates(firstCurrency, secondCurrency);
    })
</script>


    {#await promise}
        <p>loading...</p>
        {:then rrr}
        <div>
            <select bind:value={firstCurrency.name} on:change={getRates(firstCurrency, secondCurrency)}>
                {#each Currencies as currency}
                    <option>{currency}</option>
                {/each}
            </select>
            <input type="number" bind:value={firstCurrency.value}/>
            <p>{firstCurrency.value}</p>
        </div>
        <div>
            <select bind:value={secondCurrency.name} on:change={getRates(secondCurrency, firstCurrency)}>
                {#each Currencies as currency}
                    <option>{currency}</option>
                {/each}
            </select>
            <input type="number" bind:value={secondCurrency.value}/>
            <p>{secondCurrency.value}</p>
        </div>
    {/await}




<style>

</style>