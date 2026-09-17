const ApiService = {
  async getData() {
    const response =
      await fetch("./data/dataBahanAjar.json");
    return await response.json();
  }
};