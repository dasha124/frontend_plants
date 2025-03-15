import { useCollections } from '@/features/collections/model';
import { CollectionItem } from '@/features/collections/ui/CollectionItem.tsx';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

export const Page = () => {
	const { collections, isLoaded } = useCollections();

	return (
		<RenderIf
			condition={isLoaded}
			className={cn('flex flex-wrap w-full justify-center gap-4')}
		>
			{collections.map((collection) => (
				<CollectionItem
					key={collection.id}
					collection={collection}
				/>
			))}
		</RenderIf>
	);
};
