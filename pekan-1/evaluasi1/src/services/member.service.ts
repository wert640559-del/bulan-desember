import { members, type Member } from "../models/member.model"

export const getAllMembers = () => {
    return { members: members, total: members.length }
}

export const getMemberById = (id: string) => {
    const numId = parseInt(id)

    const member = members.find(p => p.id === numId)

    if (!member) {
        throw new Error("Member ga ada")
    }

    return member
}

export const searchMembers = (search?: string, min_tanggal_daftar?: string, max_tanggal_daftar?: string) => {
    let result = members;

    if (search) {
        const searchLower = (search as string).toLowerCase()
        result = result.filter(p => 
            p.nama.toLowerCase().includes(searchLower) ||
            p.email.toLowerCase().includes(searchLower) ||
            p.alamat?.toLowerCase().includes(searchLower)
        )
    }

    if (min_tanggal_daftar) {
    result = result.filter(p => new Date(p.tanggal_daftar) >= new Date(min_tanggal_daftar))
}

    if (max_tanggal_daftar) {
        result = result.filter(p => new Date(p.tanggal_daftar) <= new Date(max_tanggal_daftar))
    }

    return result
}

export const createMember = (nama: string, email: string, telepon: string, alamat?: string, tanggal_daftar?: string) => {
    const newMember = {
        id: members.length + 1,
        nama,
        email,
        alamat,
        telepon,
        tanggal_daftar: tanggal_daftar
    }

    members.push(newMember as Member)

    return members
}

export const updateMember = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = members.findIndex(p => p.id === numId)

    if (index === -1 ) {
        throw new Error("Member ga ada")
    }

    members[index] = {...members[index], ...data }

    return members[index]
}

export const deleteMember = (id: string) => {
    const numId = parseInt(id)
    const index = members.findIndex(p => p.id === numId)

    if (index === -1) {
        throw new Error("Member yang mau kamu hapus ga ada")
    } 

    const deleted = members.splice(index, 1)

    return deleted
}