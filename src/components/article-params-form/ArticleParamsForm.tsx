import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
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
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm: OnClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleOptionChange =
		(paramKey: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setFormParams((prevParams) => ({
				...prevParams,
				[paramKey]: selectedOption,
			}));
		};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChangeParams(formParams);
	};

	const handleReset = () => {
		setFormParams(defaultArticleState);
		onChangeParams(defaultArticleState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
						title='Шрифт'
					/>

					<RadioGroup
						name={'font-size'}
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
						title='Размер шрифта'
					/>

					<Select
						selected={formParams.fontColor}
						options={fontColors}
						onChange={handleOptionChange('fontColor')}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formParams.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange('backgroundColor')}
						title='Цвет фона'
					/>

					<Select
						selected={formParams.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange('contentWidth')}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
