<template>
    <div class="createContactBlock">
        <modal-item
                v-if="modal"
                @handleModal="handleModal"
                @handleAgree="handleAgree"
                text="Do you want to cancel your operations?" />
        <form>
            <div class="nameBlock">
                <input
                        type="text"
                        v-model="name"
                        placeholder="Name"
                        required />
                <input
                        type="number"
                        v-model="number"
                        placeholder="Number"
                        required />
            </div>
            <addition-item
                    class="additionItem"
                    v-for="additionItem of additionalInformation"
                    @changeAdditionName="changeAdditionName"
                    @changeAdditionValue="changeAdditionValue"
                    @handleDeleteAdditionItem="handleDeleteAdditionItem"
                    :id="additionItem.id"
                    :name="additionItem.name"
                    :value="additionItem.value"
                    :key="additionItem.id"/>
            <button-item
                    :handler="addAddition"
                    class="buttonAdd"
                    text="Add addition information"
                    color="lightgreen"/>
            <button-item
                    :handler="idProp ? editContact : createContact"
                    class="buttonCreate"
                    :text="idProp ? 'Save Contact' : 'Create Contact'"
                    color="lightblue" />
            <button-item
                    :handler="handleModal"
                    class="buttonCreate"
                    text="Cancel"
                    color="red" />
        </form>
    </div>
</template>

<script>
    import AdditionItem from '../../components/AdditionItem';
    import Button from '../Button';
    import Modal from '../Modal';


    export default {
        data() {
            return {
                name: '',
                number: '',
                additionalInformation: [],
                modal: false,
            }
        },
        created() {
            if (this.nameProp && this.additionProp && this.idProp && this.numberProp) {
                this.name = this.nameProp;
                this.number = this.numberProp;
                this.additionalInformation = this.additionProp;
            }   else {
                this.name = '';
                this.number = '';
                this.additionalInformation = [];
            }
        },
        props: {
            nameProp: String,
            additionProp: Array,
            idProp: Number,
            numberProp: String
        },
        components: {
            'addition-item': AdditionItem,
            'button-item': Button,
            'modal-item': Modal
        },
        methods: {
            handleModal() {
                this.modal = !this.modal;
            },
            handleAgree() {
                this.handleModal();
                this.$router.push('/');
            },
            addAddition() {
                const id = this.additionalInformation[this.additionalInformation.length - 1] ? this.additionalInformation[this.additionalInformation.length - 1].id + 1 : 1;
                this.additionalInformation = [...this.additionalInformation, { id: id, name: '', value: '' }];
            },
            createContact() {
                console.log(this.$store.state)
                const id = this.$store.state.contacts[this.$store.state.contacts.length - 1] ? this.$store.state.contacts[this.$store.state.contacts.length - 1].id + 1 : 1;
                this.$store.commit('addContact', { id: id, name: this.name, number: this.number, additionalInformation: this.additionalInformation })
                this.$router.push('/')
            },
            editContact() {
                this.$store.commit('editContact', { id: this.idProp, name: this.name, number: this.number, additionalInformation: this.additionalInformation });
                this.$router.push('/');
            },
            changeAdditionName(id, event) {
                this.additionalInformation = this.additionalInformation.map(el => el.id === id ? {...el, name: event} : el);
            },
            changeAdditionValue(id, event) {
                this.additionalInformation = this.additionalInformation.map(el => el.id === id ? { ...el, value: event } : el);
            },
            handleDeleteAdditionItem(id) {
                this.additionalInformation = this.additionalInformation.filter(el => el.id !== id);
            }

        }
    }
</script>

<style scoped>
    .nameBlock {
        margin: 0 auto;
        text-align: center;
    }
    .nameBlock input {
        margin: 0 10px;
        width: 200px;
        height: 50px;
        font-size: 16px;
        padding: 5px;
        box-sizing: border-box;
    }
    .createContactBlock {
        width: 100%;
    }
    .buttonCreate {
        margin: 0 auto;
        padding: 5px;
    }
    .buttonAdd {
        margin: 0 auto;
        padding: 5px;
    }
    .additionItem {
        margin: 7px auto;
    }
</style>