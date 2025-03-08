import { MaintenanceRequest } from "@/__generated__/graphql";
import { makeAutoObservable } from "mobx";

class Store {
  selectedMaintenanceRequest: MaintenanceRequest | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateSelectedMaintenanceRequest(
    selectedMaintenanceRequest: MaintenanceRequest
  ) {
    this.selectedMaintenanceRequest = selectedMaintenanceRequest;
  }
}

const store = new Store();
export default store;
