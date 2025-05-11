import { PlusOutlined } from '@ant-design/icons';
import { Button, UploadFile, UploadProps, GetProp, Image, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useCallback, useState } from 'react';

import { TPlantShortInfo } from '@/entities/plant/model';
import { UtilsService } from '@/shared/api';
import { showToast } from '@/shared/utils';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
	className?: string;
	setTypePlant: (type: string | null) => void;
	setPlants: (plants: TPlantShortInfo[]) => void;
};

export const UploadImage: React.FC<Props> = ({
	className,
	setTypePlant,
	setPlants,
}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const getBase64 = useCallback((file: FileType): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	}, []);

	const handlePreview = useCallback(
		async (file: UploadFile) => {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj as FileType);
			}
			setPreviewImage(file.url || (file.preview as string));
			setPreviewOpen(true);
		},
		[getBase64],
	);

	const handleChange: UploadProps['onChange'] = useCallback(
		async (info: UploadChangeParam<UploadFile>) => {
			const { fileList: newFileList } = info;
			if (newFileList.length > 1) {
				showToast('error', 'Можно загрузить только одну фотографию');
				return;
			}

			if (newFileList.length === 1 && newFileList[0].originFileObj) {
				const file = newFileList[0].originFileObj;

				const isImage = file.type.startsWith('image/');
				if (!isImage) {
					showToast('error', 'Можно загружать только изображения');
					return;
				}

				const utilsService = new UtilsService();

				try {
					const base64Data = await getBase64(
						newFileList[0].originFileObj as FileType,
					);
					const strippedBase64 = base64Data.replace(
						/^data:image\/\w+;base64,/,
						'',
					);

					const response = await utilsService.detectPlantType(strippedBase64);

					setTypePlant(response.type);
					setPlants(response.plants);

					newFileList[0].status = 'done';
				} catch {
					newFileList[0].status = 'error';
					showToast('error', `${newFileList[0].name} не удалось загрузить`);
				}
			}

			setFileList(newFileList);
		},
		[getBase64, setTypePlant, setPlants],
	);

	const handleRemoveFiles = useCallback(() => {
		if (fileList.length > 0) {
			setFileList([]);
			setTypePlant(null);
			setPlants([]);
		}
	}, [fileList, setTypePlant, setPlants]);

	return (
		<>
			<Upload
				className={className}
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				beforeUpload={() => false}
				accept={'image/png,image/jpeg,image/jpg,image/webp,image/svg'}
				onChange={handleChange}
				onRemove={handleRemoveFiles}
			>
				{fileList.length === 0 ? (
					<Button>
						<PlusOutlined />
					</Button>
				) : null}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{ display: 'none' }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(''),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
};
