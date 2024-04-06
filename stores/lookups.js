export const useLookupsStore = defineStore("lookups", () => {
  //  Lookups
  const regions = ref(null);
  const getRegions = async () => {
    const data = await lookupsService().getLookup("regions");
    if (data) {
      regions.value = data;
    }
    return data;
  };

  const cities = ref(null);
  const getCities = async (region_id) => {
    const data = await lookupsService().getLookup(
      `cities?region_id=${region_id}`
    );
    if (data) {
      cities.value = data;
    }
    return data;
  };

  const districts = ref(null);
  const getDistricts = async (city_id) => {
    const data = await lookupsService().getLookup(
      `districts?city_id=${city_id}`
    );
    if (data) {
      districts.value = data;
    }
    return data;
  };

  // Property Lookups
  const usages = ref(null);
  const getUsages = async () => {
    const data = await lookupsService().getPropertyLookup(`usages`);
    if (data) {
      usages.value = data;
    }
    return data;
  };

  const features = ref(null);
  const getFeatures = async () => {
    const data = await lookupsService().getPropertyLookup(`features`);
    if (data) {
      features.value = data;
    }
    return data;
  };

  const utilities = ref(null);
  const getUtilities = async () => {
    const data = await lookupsService().getPropertyLookup(`utilities`);
    if (data) {
      utilities.value = data;
    }
    return data;
  };

  const descreptions = ref(null);
  const getDescreptions = async (type_id) => {
    const data = await lookupsService().getPropertyLookup(
      `descriptions?type_id=${type_id}`
    );
    if (data) {
      descreptions.value = data;
    }
    return data;
  };

  return {
    getRegions,
    regions,

    getCities,
    cities,

    getDistricts,
    districts,

    getUsages,
    usages,

    getFeatures,
    features,

    getUtilities,
    utilities,

    getDescreptions,
    descreptions,
  };
});
