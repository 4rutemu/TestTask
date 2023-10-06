<script lang="ts">
    import {BASE_URL, Currencies} from "../environment.ts";
    import {beforeUpdate, onMount} from "svelte";

    type Currency = {
        name: string;
        value: number | undefined;
    }

    let firstCurrency: Currency = {name: 'USD', value: 1};
    let secondCurrency: Currency = {name: 'RUB', value: 99.92481};
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



    onMount(() => {
        promise = getRates()
    })
</script>


    {#await promise}
        <p>loading...</p>
        {:then rrr}
        <div>
            <select bind:value={firstCurrency.name}
                    on:change={() => {getRates().then(() => {
                       firstCurrency.value = secondCurrency.value / coef;
                       firstCurrency = firstCurrency;
                    })}}
            >
                {#each Currencies as currency}
                    <option>{currency}</option>
                {/each}
            </select>
            <input type="number" bind:value={firstCurrency.value}
                   on:change={() => {
                       secondCurrency.value = firstCurrency.value * coef;
                       secondCurrency = secondCurrency;
                   }
                   }
            />
            <p>{firstCurrency.value}</p>
        </div>
        <div>
            <select bind:value={secondCurrency.name}
                    on:change={() => {getRates().then(() => {
                       secondCurrency.value = firstCurrency.value * coef;
                       secondCurrency = secondCurrency;
                    })}}
            >
                {#each Currencies as currency}
                    <option>{currency}</option>
                {/each}
            </select>
            <input type="number" bind:value={secondCurrency.value}
                   on:change={() => {
                       firstCurrency.value = secondCurrency.value / coef;
                       firstCurrency = firstCurrency;
                   }
                   }
            />
            <p>{secondCurrency.value}</p>
        </div>
    {/await}




<style>

</style>