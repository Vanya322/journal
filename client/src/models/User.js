import { store } from "../main";
import {USER_TYPE_ADMIN, USER_TYPE_MEMBER, USER_TYPES} from "../utils/utils";

export class User {
    constructor(id, name, email, type) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = USER_TYPES[type];
    }

    static fromDto(data) {
        return new User(data.id, data.name, data.email, data.type);
    }

    get isMember() {
        return this.type === USER_TYPE_MEMBER;
    }

    get isAdmin() {
        return this.type === USER_TYPE_ADMIN;
    }

    get abbreviation() {
        return this.name.split(" ")
            .filter((it, index) => index < 2)
            .map(it => [...it][0]).join("");
    }

    static async getToken() {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
    }

    checkPageForAvailability(targetPage) {
        if (!targetPage.name) {
            console.warn("Unexpected Page by route:", targetPage.path);
            return false;
        }

        const foundPage = store.state.pagesModule.pages.find((it) => (
            it.name === targetPage.name || targetPage.name.startsWith(it.name)
        ));

        return foundPage ? foundPage.routing.hasAccess(this) : false;
    }

    applyRedirectRules(to, from, next) {
        if (!this.checkPageForAvailability(to)) {
            next({ name: "GroupsPage" });
        } else {
            next();
        }
    }
}