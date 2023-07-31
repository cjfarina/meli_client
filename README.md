This is a Mercado Libre challenge developed in [Next.js](https://nextjs.org/).

The app consist in 3 main components: the search box, the results display, and the product detail description.

This project is divided in client and server and uses next stack:

**Client**
- Next.js
- HTML
- JavaScript and TypeScript
- SASS with CSS modules 

**Server**

Api rest developed in:
- Node 18
- Express

## Install

### Client

**Run** 

```bash
npm install
npm run dev
```

**Test** 
```bash
npm run test
```

### Server

**Run** 

```bash
npm install
npm run dev
```
## Getting Started

### Search input
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The layout of this site is implemented in `/app/layout.tsx` and I use `display: grid` for layout based in 12 columns.

When You open http://localhost:3000 a search bar is displayed. This bar is implemented in SearchInput.tsx. 

### List items
After enter on the input or click on search button it is redirected to `/items?search='query'`. 
It displays a list of four items.
The page displayed is implemented in `app/items/pages.tsx`. It consist in a CSR component which, 
on mount process fetches the data from `${apiPath}/items?q=query`.

> For manage efficiently a large sets of items, we should implement a lazy loading of the items
with infinity scroll [https://cloudinary.com/blog/lazy-loading-with-infinite-scroll](https://cloudinary.com/blog/lazy-loading-with-infinite-scroll).

> The list of images is displayed using `Image` component from Next.js. This avoid **Cumulative Layout Shift** and allows 
**automatic lazy-loading**, and **automatic sizing** across devices. However, in a real production app, before serving the images
to end-users, we should to Choose the right format, resize images and compress images. It's important to prepare the images in order to achieve optimum performance results. If we are dealing with a dynamic and large amount of images, we may want to consider a Content Delivery Network (CDN) to host the images. CDNs provide many images and application performance benefits such as automatic caching, file compression, and image resizing on the fly.

> I use useSWR hook. SWR is a React Hooks library for data fetching. The name “SWR” is derived from stale-while-revalidate, a cache invalidation strategy popularized by HTTP RFC 5861. SWR first returns the data from cache (stale), then sends the request (revalidate), and finally comes with the up-to-date data again.

> FIXME: I added SEO using NextSeo but is is not working. I have tried using Head component too, but it doesn't work. Maybe is it a setting problem. it seam it is a common issue: [https://github.com/garmeeh/next-seo/issues/966](https://github.com/garmeeh/next-seo/issues/966) 

### Display an item

After clicking on an item, it is redirected to `/items/itemId` and a product is displayed.
The page displayed is implemented in `app/items/[id]/pages.tsx`. It consist in a SSR component which fetches the data from `${apiPath}/items/${params?.id}`. The advantages to be an SSR component is improve the SEO strategy for every product.

> For List Items and Display items we reuse Categories component.

> This view is **responsive**.

I tried to use Head component in order to avoid to duplicate request.
However, it doesn't work for replacing meta data. I tried next, but it didn't work:
https://github.com/vercel/next.js/issues/35172
In order to add SEO data, the only way worked was defining `generateMetadata` method.
I think with time, I could fix it, using Head in next way or using a cache for request:

```jsx
return item ? (
<>
  <Head>
    <title>{item.title} - Mi Tienda</title>
    <meta property="og:title" content="My page title" key="title" />
    <meta
      name="description"
      key="description"
      content={`Compre ${item.title} al mejor precio en Mi Tienda. ${item.description}`}
    />
  </Head>
  {...}
</>
) : (
  <div>El producto no existe</div>
);
```

### Testing

I added a simple test for `Category` component.

### Some important clarifications


 > I added `location` attribute to item model. It is necessary for display the location. However, it is specified in the documentation.
 
 > When I was finishing all the exercise, I realized than I also have to display categories in the display of a product. However, in the doc specifies that the api only return an item for that screen. So it seam I should keep the category list from  the preview list view. If so, it should be implemented using a new layout for items that keep categories list in the header. I don't know if it is only an specification error, so I decided to change the api in order that `${apiPath}/items/${params?.id}` return `{item: items, category: categories}`. Let me know please if you need I refactor it.
 
 > In the specification says that I must request `https://api.mercadolibre.com/items/:id /description` for description. However, according to the specification, description comes in the json of item, so it wouldn't be necessary to do en extra request for getting the description.  




