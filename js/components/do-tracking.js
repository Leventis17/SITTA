Vue.component("do-tracking", {

  template: "#tpl-do-tracking",
  props: {
  tracking: {
    type: Array,
    default: () => []
  }
},

  data() {
    return {
      keyword: "",
      showPopup: false,
      selectedTracking: null
    };
},

  computed: {
    filteredTracking() {
      if (!this.keyword) {
        return this.tracking;
      }

      const key =
        this.keyword.toLowerCase();
      return this.tracking.filter(item =>

        String(item.nomorDO || "")
          .toLowerCase()
          .includes(key)

        ||

        String(item.nim || "")
          .toLowerCase()
          .includes(key)
      );
    },

    hargaPaket() {
      if (!this.selectedPaket) {
        return "";
      }

      return (
        "Rp " +
        Number(this.selectedPaket.harga)
        .toLocaleString("id-ID")
      );
    }
  },

  methods: {
    searchTracking() {
    if (!this.keyword.trim()) {

    Swal.fire(
      "Peringatan",
      "Masukkan NIM, Nama atau Nomor DO",
      "warning"
    );
    return;
  }
  
  const key =
    this.keyword.toLowerCase();
  const hasil =
    this.tracking.find(item =>

      String(item.nomorDO || "")
        .toLowerCase()
        .includes(key)

      ||

      String(item.nim || "")
        .toLowerCase()
        .includes(key)

      ||

      String(item.nama || "")
        .toLowerCase()
        .includes(key)
    );

  if (!hasil) {
    Swal.fire(
      "Tidak Ditemukan",
      "Data tracking tidak ditemukan",
      "error"
    );

    return;
  }

  this.selectedTracking = hasil;
  this.showPopup = true;
    },

    clearSearch() {
      this.keyword = "";
    },
    closePopup() {
  this.showPopup = false;
  this.selectedTracking = null;
  },
  }
});