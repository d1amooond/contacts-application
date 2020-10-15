<template>
    <div class="contactItem">
        <div class="contact">
            <div class="icon">
                <font-awesome-icon icon="anchor" />
            </div>
            <div @click="additionalInformationShow = !additionalInformationShow" class="name">
                {{name}} - {{number}}
            </div>
            <div class="icon">
                <font-awesome-icon
                        @mouseout="editColor = 'gray'"
                        @mouseover="editColor = 'white'"
                        @click="editContact"
                        icon="edit"
                        :color="editColor"/>
            </div>
            <div class="icon">
                <font-awesome-icon
                        icon="backspace"
                        @mouseout="deleteColor = 'red'"
                        @mouseover="deleteColor = 'white'"
                        @click="deleteContact"
                        :color="deleteColor" />
            </div>
            <div>

            </div>
        </div>
        <div class="additionList" v-if="additionalInformationShow">
            <div class="addition" v-for="contactItem in additionalInformation" :key="contactItem.id">
                <div class="icon">
                    <font-awesome-icon v-if="contactItem.completed" icon="check" color="lightgreen"/>
                </div>
                <div class="additionInformation">
                    <div class="additionInformationName">
                        {{contactItem.name}}
                    </div>
                    <div class="additionInformationValue">
                        {{contactItem.value}}
                    </div>
                </div>
            </div>
            <div v-if="more"
                 class="more"
                 :style="`color: ${moreColor}`"
                 @click="loadMore"
                 @mouseout="moreColor = 'black'"
                 @mouseover="moreColor = 'white'">...</div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            loadMore() {
                this.$emit('loadMore', 'loadMore')
            },
            deleteContact() {
                this.$emit('deleteContact', 'Do you really want to delete contact?', this.id)
            },
            editContact() {
                this.$router.push({ name: 'contact', params: { additionalInformation: this.additionalInformation, number: this.number, name: this.name, id: this.id } })
            }
        },
        props: {
            name: String,
            additionalInformation: Array,
            more: Boolean,
            id: Number,
            number: String,
        },
        data() {
            return {
                additionalInformationShow: false,
                editColor: 'gray',
                deleteColor: 'red',
                moreColor: 'black'
            }
        }
    }
</script>

<style scoped>
    .contactItem {
        width: 500px;
        background: #2fb5ff;
        border-radius: 10px;
        border: 1px solid white;
        padding: 20px;
        font-size: 20px;
    }
    .name {
        cursor: pointer;
        width: 90%;
        padding: 10px;
    }
    .name:hover {
        background: #60e6ff;
    }
    .contact {
        display: flex;
        align-items: center;
    }
    .icon {
        width: 10%;
    }
    .addition {
        display: flex;
    }
    .additionList {
        padding: 20px;
    }
    .more {
        cursor: pointer;
    }
    .additionInformation {
        display: flex;
        justify-content: space-between;
        width: 100%;

    }
</style>