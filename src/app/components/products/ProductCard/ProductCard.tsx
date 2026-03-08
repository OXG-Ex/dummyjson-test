'use client';

import Image from 'next/image';
import type {Product} from '../../../shared/api/types';
import {Button} from '../../ui/Button/Button';
import {Txt} from '../../ui/Txt/Txt';
import styles from './ProductCard.module.scss';
import {blurredImageData} from './consts';

interface Props {
  product: Product;
  isAuthenticated: boolean;
}

export const ProductCard: React.FC<Props> = ({product, isAuthenticated}) => {
  const imageUrl = product.thumbnail ?? product.images[0];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            style={{objectFit: 'cover'}}
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={blurredImageData}
          />
        )}
      </div>
      <div className={styles.content}>
        <Txt as="h2" weight="bold">
          {product.title}
        </Txt>
        <Txt>{product.category}</Txt>
        <div className={styles.bottomRow}>
          <Txt weight="bold" variant="subtitle">
            ${product.price}
          </Txt>
          {isAuthenticated && (
            <Button size="sm" onClick={() => console.log(product.title)}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
