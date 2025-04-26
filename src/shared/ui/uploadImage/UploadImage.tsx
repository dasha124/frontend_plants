'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, UploadFile, UploadProps, GetProp, Image, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import React, { useCallback, useState } from 'react';

import { UtilsService } from '@/shared/api';
import { showToast } from '@/shared/utils';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
	initialFile: string | null;
	fileName: string;
	setLink: (link: string) => void;
	removeLink: () => void;
	className?: string;
};

export const UploadImage: React.FC<Props> = ({
	initialFile,
	fileName,
	setLink,
	removeLink,
	className,
}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>(
		initialFile
			? [
					{
						uid: '-1',
						name: 'image',
						status: 'done',
						url: initialFile,
					},
				]
			: [],
	);

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

	const handleChange: UploadProps['onChange'] = async (
		info: UploadChangeParam<UploadFile>,
	) => {
		if (!fileName) {
			showToast('error', 'Укажите название растения');
			return;
		}

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

				const response = await utilsService.uploadImage(
					fileName,
					strippedBase64,
				);
				setLink(response);

				newFileList[0].status = 'done';
			} catch {
				newFileList[0].status = 'error';
				showToast('error', `${newFileList[0].name} не удалось загрузить`);
			}
		}

		setFileList(newFileList);
	};

	const handleRemoveFiles = useCallback(() => {
		if (fileList.length > 0) {
			removeLink();
			setFileList([]);
		}
	}, [removeLink, fileList]);

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
				disabled={!fileName}
			>
				{fileList.length === 0 ? (
					<Button disabled={!fileName}>
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
