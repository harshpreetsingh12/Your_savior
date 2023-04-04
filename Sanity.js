import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
    projectId: "vjf335q6",
    dataset:'production',
    useCdn:true,
    apiVersion:'2021-10-21',
    watchMode:true,
    token:'skQosSMK1IG0eCTHZLAA1SStPPfKvo5hL4nwKTWftBSrOqHGee1VUBUPRE1A2lSqPeXCUwiTjdHRS45bDzKo0zrsS41mFeLHnsEEwtkYbSyHyO5FLDaxZ1nFf2mjcOvdo8aN7neBqmcfwSiLgLWHEVulFgDvohEjscVzBNBrpxCaJ21h0iyS'
//  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
//     dataset:process.env.PUBLIC_SANITY_DATASET || 'production',
//     useCdn:process.env.NODE_ENV==='production',
//     apiVersion:'2021-10-21'
});
const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)

export default client;