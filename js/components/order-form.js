Vue.component("order-form", {

  props: [
    "upbjjlist",
    "kategorilist",
    "edititem"
  ],

  data() {
    return {
      isEdit: false,
      form: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: "",
        catatan: ""
      }
    };
  },

  watch: {
    edititem: {
      immediate: true,
      deep: true,

      handler(val) {
        if (val) {
          this.isEdit = true;
          this.form = {
            ...val
          };

        } else {
          this.isEdit = false;
          this.resetForm();
        }
      }
    }
  },

  methods: {
    submitForm() {
      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj
      ) {

        Swal.fire({
          icon: "warning",
          title: "Peringatan",
          text: "Lengkapi seluruh data terlebih dahulu."
        });

        return;
      }

      this.$emit(
        "save-item",
        {
          ...this.form
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: this.isEdit
          ? "Data berhasil diperbarui."
          : "Data berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false
      });

      this.isEdit = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: "",
        catatan: ""
      };
    }
  },

  template: "#tpl-order-form"
});