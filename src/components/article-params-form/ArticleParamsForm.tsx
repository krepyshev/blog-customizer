import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { OnClick } from '../arrow-button/ArrowButton';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

export const ArticleParamsForm = ({
	onChangeParams,
}: {
	onChangeParams: (params: ArticleStateType) => void;
}) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formParams, setFormParams] = useState(defaultArticleState);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		contentWidthArr[0]
	);

	const toggleForm: OnClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	type OptionSetter = Dispatch<SetStateAction<OptionType>>;

	const handleOptionChange =
		(optionSetter: OptionSetter, paramKey: keyof ArticleStateType) =>
		(selectedOption: OptionType) => {
			optionSetter(selectedOption);
			setFormParams((prevParams) => ({
				...prevParams,
				[paramKey]: selectedOption,
			}));
		};

	const handleApply = () => {
		onChangeParams(formParams);
	};

	const handleReset = () => {
		setSelectedFontFamily(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColor(fontColors[0]);
		setSelectedBackgroundColor(backgroundColors[0]);
		setSelectedContentWidth(contentWidthArr[0]);
		onChangeParams(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={`${styles.container} ${
					isFormOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						onChange={handleOptionChange(
							setSelectedFontFamily,
							'fontFamilyOption'
						)}
						title='Шрифт'
					/>

					<RadioGroup
						name={'font-size'}
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleOptionChange(setSelectedFontSize, 'fontSizeOption')}
						title='Размер шрифта'
					/>

					<Select
						selected={selectedFontColor}
						options={fontColors}
						onChange={handleOptionChange(setSelectedFontColor, 'fontColor')}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={selectedBackgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange(
							setSelectedBackgroundColor,
							'backgroundColor'
						)}
						title='Цвет фона'
					/>

					<Select
						selected={selectedContentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange(
							setSelectedContentWidth,
							'contentWidth'
						)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='button' />
						<Button title='Применить' onClick={handleApply} type='button' />
					</div>
				</form>
			</aside>
		</>
	);
};
