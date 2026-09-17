Vue.component("stock-table", {
  
  props: [
    "stok",
    "upbjjlist",
    "kategorilist"
  ],

  data() {
    return {
      selectedUpbjj: "",
      selectedKategori: "",
      reorderOnly: false,
      sortBy: "judul",
      hoverItem: null
    };
  },
  
  watch: {
    selectedUpbjj() {
      this.selectedKategori = "";
    },

    reorderOnly(newVal) {
      console.log(
        "Filter reorder berubah:",
        newVal
      );
    }
  },

  computed: {
    kategoriFiltered() {
      if (!this.selectedUpbjj)
        return [];

      const hasil =
        this.stok.filter(
          item =>
            item.upbjj ===
            this.selectedUpbjj
        );

      return [
        ...new Set(
          hasil.map(
            item => item.kategori
          )
        )
      ];
    },

    filteredStock() {
      let hasil = [...this.stok];
      if (this.selectedUpbjj) {
        hasil = hasil.filter(
          x =>
            x.upbjj ===
            this.selectedUpbjj
        );
      }

      if (this.selectedKategori) {
        hasil = hasil.filter(
          x =>
            x.kategori ===
            this.selectedKategori
        );
      }

      if (this.reorderOnly) {
        hasil = hasil.filter(
          x =>
            x.qty < x.safety ||
            x.qty === 0
        );
      }

      hasil.sort((a, b) => {
        if (
          this.sortBy === "judul"
        ) {
          return a.judul.localeCompare(
            b.judul
          );
        }

        if (
          this.sortBy === "qty"
        ) {
          return a.qty - b.qty;
        }

        if (
          this.sortBy === "harga"
        ) {
          return a.harga - b.harga;
        }

        return 0;
      });

      return hasil;
    }
  },

  methods: {
    editItem(item) {
      this.$emit(
        "edit-item",
        item
      );
    },
    
    async deleteItem(item) {
    const result = await Swal.fire({
    title: "Hapus Data?",
    text: `Data ${item.kode} akan dihapus permanen.`,
    icon: "warning",
    width: "380px",
    showCancelButton: true,

    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#004098",

    showClass: {
      popup: "animate__animated animate__zoomIn"
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut"
    }
  });

  if (!result.isConfirmed) {
    return;
  }

  this.$emit(
    "delete-item",
    item
  );

  Swal.fire({
    title: "Berhasil",
    text: "",
    icon: "success",
    width: "350px",
    timer: 1500,
    showConfirmButton: false
  });

},

    resetFilter() {
      this.selectedUpbjj = "";
      this.selectedKategori = "";
      this.reorderOnly = false;
      this.sortBy = "judul";
    }
  },
  template: "#tpl-stock-table"
});