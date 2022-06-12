
export class Application {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
    isGame: boolean;
    created: Date;
    updated: Date;
    authorId: number;
    authorUsername: string;

    constructor(data?: any) {
        if (data) {
            this.id = data.pk;
            this.name = data.name;
            this.description = data.description;
            this.imageSrc = data.image_src;
            this.isGame = data.is_game;
            this.created = data.created;
            this.updated = data.updated;
            this.authorId = data.author_id;
            this.authorUsername = data.author_name;
        }
    }

    get shortDescription() {
        if (this.description.length < 300) 
            return this.description;

        const shortage = this.description.substring(0, 300);
        return shortage + '...';
    }

    get type() {
        return this.isGame ? 'Game' : 'Application';
    }
}