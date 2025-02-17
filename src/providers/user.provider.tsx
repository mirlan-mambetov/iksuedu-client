import { USER_PROFILE } from '@/constants/request.keys.constants'
import { UserContext } from '@/context/user.context'
import { AuthEnum } from '@/enum/auth.enum'
import { UserEnum } from '@/enum/user.enum'
import {
	loadUserFromStorage,
	removeFromStorage,
	saveUserToStorage,
} from '@/helpers/storage.helpers'
import { useAuth } from '@/hooks/useAuth'
import { IUser } from '@/interfaces/user.interface'
import { userService } from '@/services/user.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

export const UserProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUser | undefined>(
		loadUserFromStorage() || undefined
	)
	const { setAuthHandle } = useAuth()
	const queryClient = useQueryClient()

	const { isAuth } = useAuth()

	const { data } = useQuery({
		queryKey: [USER_PROFILE],
		queryFn: () => userService.fetchUserProfile(),
		select: (data) => data.data,
		enabled: !!isAuth,
	})

	React.useEffect(() => {
		if (data) {
			setUser(data)
			saveUserToStorage(data)
		}
	}, [data])

	const logOutHandle = () => {
		removeFromStorage(UserEnum.USER_TO_STORAGE)
		removeFromStorage(AuthEnum.ACCESS_TOKEN)
		removeFromStorage(AuthEnum.IS_AUTHENTIFICATION)
		setAuthHandle()
		setUser(undefined)
		queryClient.invalidateQueries({ queryKey: [USER_PROFILE] })
	}

	return (
		<UserContext.Provider value={{ user, logOutHandle, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
