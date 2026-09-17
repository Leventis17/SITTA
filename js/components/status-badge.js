Vue.component("status-badge", {
  props: ["qty", "safety"],

  computed: {
    status() {
      if (this.qty === 0) return "Kosong";
      if (this.qty < this.safety) return "Menipis";
      return "Aman";
    },

    badgeClass() {
      if (this.qty === 0) return "danger";
      if (this.qty < this.safety) return "warning";
      return "success";
    }
  },

  template: "#tpl-status-badge"
});