Vue.component("do-page", {

  template: "#tpl-do-page",

  props: {
    paket: {
      type: Array,
      default: () => []
    },

    pengirimanlist: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      form: {
        nim: "",
        nama: "",
        pengiriman: "",
        tanggalKirim: ""
      },

      selectedPaket: null
    };
  },

  computed: {
  hargaPaket() {
    if (!this.selectedPaket) {
      return "";
    }

    return (
      "Rp " +
      Number(this.selectedPaket.harga)
      .toLocaleString("id-ID")
    );
  },

  totalHarga() {
    if (!this.selectedPaket) {
      return "0";
    }

    return Number(
      this.selectedPaket.harga
    ).toLocaleString("id-ID");
  },

  showInvoice() {
    return (
      this.form.nim ||
      this.form.nama ||
      this.form.pengiriman ||
      this.form.tanggalKirim ||
      this.selectedPaket
    );
  }
},
  
  methods: {
    submitOrder() {
      if (
        !this.form.nim ||
        !this.form.nama ||
        !this.form.pengiriman ||
        !this.form.tanggalKirim ||
        !this.selectedPaket
      ) {

        Swal.fire(
          "Peringatan",
          "Lengkapi seluruh data",
          "warning"
        );
        return;
      }

      const nomorDO =
        "DO" +
        new Date().getFullYear() +
        "-" +
        String(Date.now())
        .slice(-3);
        
      const dataBaru = {
        nomorDO,

        nim:
          this.form.nim,
        nama:
          this.form.nama,
        pengiriman:
          this.form.pengiriman,
        tanggalKirim:
          this.form.tanggalKirim,
        total:
          this.selectedPaket.harga,
        status:
          "Diproses",
        paket:
          this.selectedPaket.kode,

        perjalanan: [
          {
            waktu:
              new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),

            keterangan:
              "Pesanan sedang diproses"
          }
        ]
      };

      this.$emit(
        "add-tracking",
        dataBaru
      );

      Swal.fire({
        icon: "success",
        title: "Order berhasil dibuat",
        text: "Silakan kunjungi hamalaman berikutnya",
        timer: 2500,
        showConfirmButton: false
      });

      this.form = {
        nim: "",
        nama: "",
        pengiriman: "",
        tanggalKirim: ""
      };
      this.selectedPaket = null;
    }
  }

});