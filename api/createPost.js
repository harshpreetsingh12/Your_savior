const config ={
    dataset:process.env.PUBLIC_SANITY_DATASET,
    projectId:process.env.PUBLIC_SANITY_PROJECT_ID,
    useCdn:process.env.NODE_ENV==='production',
    token: process.env.SANITY_API_TOKEN
}