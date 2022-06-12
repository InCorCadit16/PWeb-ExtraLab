import { PublisherGuard } from "./publisher.guard";
import { NoAuthGuard } from "./no-auth.guard";


export {
    PublisherGuard as AuthGuard,
    NoAuthGuard,
}


export const Guards = [
    PublisherGuard,
    NoAuthGuard,
]