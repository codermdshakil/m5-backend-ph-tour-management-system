import { model, Schema } from "mongoose";
import { ITour } from "./tour.interface";


const tourSchema = new Schema<ITour>({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }
}, {
    timestamps: true
})


tourSchema.pre("save", async function (next) {

    if (this.isModified("title")) {
        const baseSlug = this.title.toLowerCase().split(" ").join("-");
        let slug = baseSlug;

        let counter = 1;
        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`; // dhaka-division-1, dhaka-division-2, ...
        }

        this.slug = slug;
    }
    next();
})

tourSchema.pre("findOneAndUpdate", async function (next) {
    const tour = this.getUpdate() as Partial<ITour>

    const update = this.getUpdate() as Partial<ITour>;

    if (update.title) {
        const baseSlug = update.title.toLowerCase().split(" ").join("-");
        let slug = baseSlug;

        let counter = 1;
        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`; // sylhet-division-1, sylhet-division-2 ...
        }

        update.slug = slug;
        this.setUpdate(update);
    }

    next();
})


export const Tour = model<ITour>("Tour", tourSchema);
