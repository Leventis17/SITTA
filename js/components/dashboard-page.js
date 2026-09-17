Vue.component("dashboard-page", {
  template: "#tpl-dashboard-page",

  props: {
    stok: {
      type: Array,
      default: () => []
    },

    tracking: {
      type: Array,
      default: () => []
    }
  },

  data() {
    const user =
      JSON.parse(
        localStorage.getItem("userLogin")
      ) || {};
    return {
      userLogin: user,
      currentTime: ""
    };
  },

  computed: {
    greeting() {
      const hour =
        new Date().getHours();
      if (hour < 12) {
        return "Selamat Pagi";
      }
      if (hour < 15) {
        return "Selamat Siang";
      }
      if (hour < 18) {
        return "Selamat Sore";
      }
      return "Selamat Malam";
    },

    totalStok() {
       return this.stok.length;
    },
    doDikirim() {
        return this.tracking.length;
    },

    stokMenipis() {
      return this.stok.filter(
        item =>
          Number(item.qty || 0) <=
          Number(item.safety || 0)
      ).length;
    }
  }
});