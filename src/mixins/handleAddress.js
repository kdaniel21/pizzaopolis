export default {
  methods: {
    createShortLabel(address) {
      return `${address.address.street} ${address.address.houseNumber}, ${address.address.city} - ${address.name} (${address.phone})`;
    },
    createLongLabel(information) {
      return `
        ${information.name}\n
        ${information.phone}\n
        ${information.houseNumber}. ${information.street}\n
        ${information.postalCode} ${information.city}\n
        ${information.state}\n
        ${information.country}
      `;
    }
  }
};
