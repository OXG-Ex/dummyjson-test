import {cookies} from 'next/headers';
import {ProductCard} from './components/products/ProductCard/ProductCard';
import {ErrorMessage} from './components/ui/ErrorMessage/ErrorMessage';
import {Txt} from './components/ui/Txt/Txt';
import styles from './page.module.scss';
import api from './shared/api/axiosInstance';
import {Product, ProductsResponse} from './shared/api/types';

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await api.get<ProductsResponse>('https://dummyjson.com/products', {
      params: {limit: 12},
    });

    return response.data.products;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('Failed to load products');
    }
  }
}

const HomePage = async () => {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';

  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    const details = error instanceof Error ? error.message : undefined;

    return (
      <div className={styles.wrapper}>
        <Txt weight="bold" as="h1" variant="title" className={styles.title}>
          Products
        </Txt>
        <ErrorMessage message="Failed to load products. Please try again later." details={details} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Txt weight="bold" as="h1" variant="title" className={styles.title}>
        Products
      </Txt>
      {products.length === 0 ? (
        <ErrorMessage message="No products found." />
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isAuthenticated={isAuthenticated} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
