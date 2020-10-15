<template>
    <div class="additionItemBlock">
        <div class="additionName">
            <input type="text" placeholder="Title" :value="name" @change="changeAdditionName($event)" />
        </div>
        <div class="additionValue">
            <input type="text" placeholder="Value" :value="value" @change="changeAdditionValue($event)" />
        </div>
        <div>
            <button @click.prevent="handleDeleteAdditionItem" class="deleteAdditionItem">X</button>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            value: String,
            id: Number
        },
        methods: {
            changeAdditionName(event) {
                this.$emit('changeAdditionName', this.id, event.target.value)
            },
            changeAdditionValue(event) {
                this.$emit('changeAdditionValue', this.id, event.target.value)
            },
            handleDeleteAdditionItem() {
                this.$emit('handleDeleteAdditionItem', this.id)
            }
        }
    }
</script>

<style scoped>
    .additionItemBlock {
        display: flex;
        position: relative;
    }
    .additionItemBlock:first-child {
        width: 50%;
    }
    .additionName {
        width: 50%;
    }
    .additionName input {
        width: 100%;
        height: 40px;
        font-size: 20px;
    }
    .additionValue {
        margin-left: 5%;
        width: 50%;
    }
    .additionValue input {
        width: 100%;
        height: 40px;
        font-size: 20px;
    }
    .deleteAdditionItem {
        position: absolute;
        top: 0;
        right: -20px;
    }
</style>