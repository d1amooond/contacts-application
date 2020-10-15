<template>
    <div class="contact">
        <change-contact :nameProp="name" :additionProp="additionalInformation" :idProp="id" :numberProp="number"/>
    </div>

</template>

<script>
    import ChangeContact from '../components/ChangeContact';

    export default {
        computed: {
            name() {
                return this.$route.params.name;
            },
            additionalInformation() {
                return this.$route.params.additionalInformation;
            },
            id() {
                return this.$route.params.id;
            },
            number() {
                return this.$route.params.number
            }
        },
        components: {
            'change-contact': ChangeContact
        }
    }
</script>

<style scoped>

</style>