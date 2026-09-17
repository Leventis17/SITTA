new Vue({
  el: "#app",

  data: {
    tab: "dashboard",
    upbjjList: [],
    kategoriList: [],
    pengirimanList: [],
    paket: [],
    stok: [],
    tracking: [],
    editData: null
  },

  async created() {
    try {
      const data =
        await ApiService.getData();
      this.upbjjList =
        data.upbjjList || [];
      this.kategoriList =
        data.kategoriList || [];
      this.pengirimanList =
        data.pengirimanList || [];
      this.paket =
        data.paket || [];
      this.stok =
        data.stok || [];
      this.tracking =
        data.tracking || [];
    } catch (err) {
      console.error(
        "Gagal memuat data:",
        err
      );
    }
  },

  methods: {

    saveItem(item) {
    item.catatanHTML =
    (item.catatan || "")
      .replace(/\n/g, "<br>");

    const index =
    this.stok.findIndex(
      x => x.kode === item.kode
    );

  if (index >= 0) {
    this.$set(
      this.stok,
      index,
      item
    );
  } else {
    this.stok.push(item);
  }
  this.editData = null;
},

    editItem(item) {
      this.editData =
        JSON.parse(
          JSON.stringify(item)
        );
    },

    deleteItem(item) {
      this.stok =
        this.stok.filter(
          x => x.kode !== item.kode
        );
    },

    addTracking(dataBaru) {
      console.log(
        "Tambah Tracking:",
        dataBaru
      );

      this.tracking.push(
        dataBaru
      );
    },

    addProgress(payload) {
      const item =
        this.tracking.find(
          t =>
            t.nomorDO ===
            payload.nomorDO
        );
      if (!item) return;

      item.perjalanan.push({
        waktu:
          payload.waktu,
        keterangan:
          payload.keterangan
      });
    }
  }
});