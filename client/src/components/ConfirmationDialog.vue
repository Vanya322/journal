<template>
  <v-dialog v-model="open" max-width="500px">
    <v-card :loading="loading">
      <v-card-title class="headline">{{ header }}</v-card-title>
      <v-card-text> {{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close()" :disabled="loading">{{
          cancelText
        }}</v-btn>
        <v-btn
          :color="submitColor"
          text
          @click="submit()"
          :disabled="loading"
          >{{ submitText }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",

  data: () => ({
    open: false,
    loading: false,
    header: "",
    text: "",
    cancelText: "",
    submitText: "",
    submitColor: "green",
    onSubmit: () => {},
  }),

  methods: {
    openDialog({
       header,
       text,
       cancelText,
       submitText,
       submitColor,
       onSubmit,
     }) {
      if (header) {
        this.header = header;
      }
      if (text) {
        this.text = text;
      }
      if (cancelText) {
        this.cancelText = cancelText;
      }
      if (submitText) {
        this.submitText = submitText;
      }
      if (submitColor) {
        this.submitColor = submitColor;
      }
      if (onSubmit) {
        this.onSubmit = onSubmit;
      }
      this.open = true;
    },

    close() {
      this.open = false;
    },

    async submit() {
      this.loading = true;
      await this.onSubmit();
      this.loading = false;
      this.open = false;
    },
  }
}
</script>
