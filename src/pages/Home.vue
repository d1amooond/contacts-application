<template>
    <div class="home">
        <h2 class="home_h2">Your Contacts</h2>
        <router-link to="/contact">
            <home-button class="button" color="lightblue" text="Add Contact"/>
        </router-link>
        <modal
                :text="modalText"
                @handleAgree="modalHandler"
                @handleModal="handleModal"
                v-if="modal" />
        <draggable v-model='contacts' group="people" @start="drag=true" @end="drag=false">
        <home-contact-item
                @deleteContact="deleteContact"
                @loadMore="handleLoadMore"
                class="home_contact"
                v-for="contact in contacts"
                :id="contact.id"
                :name="contact.name"
                :number="contact.number"
                :key="contact.id"
                :more="contact.additionalInformation.length > elements"
                :additionalInformation="contact.additionalInformation.slice(0, elements)" />
        </draggable>
    </div>

</template>

<script>
    import Button from '../components/Button';
    import ContactItem from '../components/ContactItem';
    import Modal from '../components/Modal';
    import draggable from 'vuedraggable'

    export default {
        methods: {
                handleLoadMore() {
                    this.elements += 3;
                },
                handleModal() {
                    this.modal = !this.modal;
                },
                deleteContact(text, id) {
                    this.modalText = text;
                    this.modalHandler = () =>  {
                        this.$store.commit('deleteContact', { id: id })
                    };
                    this.handleModal();
                }
        },
        data() {
            return {
                elements: 3,
                text: 'Add contact',
                modal: false,
                modalText: '',
                modalHandler: null
            }
        },
        computed: {
                contacts: {
                    get() {
                        return this.$store.state.contacts
                    },
                    set(contacts) {
                        this.$store.commit('updateContacts', contacts)
                    }
                }
        },
        components:
            {
                'home-button': Button,
                'home-contact-item': ContactItem,
                'modal': Modal,
                draggable
            }
    }
</script>

<style scoped>
    .home_h2 {
        font-size: 30px;
        font-family: Charter;
        text-align: center;
    }
    .button {
        margin: 0 auto;
    }
    .home_contact {
        margin: 5px auto;
    }
    .home {
        margin: 0 auto;
    }
</style>