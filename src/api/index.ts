import axios from "axios";
import { Product } from "../components/ListProduct";

const baseURL = "https://clbtinhocued.me";

const axiosClient = axios.create({
  baseURL,
});

export interface ListResponseProduct {
  products: Product[];
  current_page: number;
  total_pages: number;
  total_rows: string;
}

export interface Category {
  MaDanhMuc: string;
  TenDanhMuc: string;
}

export interface DetailProduct {
  MaSanPham: string;
  TenSanPham: string;
  DaBan: string;
  Gia: string;
  SoLuongConLai: string;
  TenDanhMuc: string;
  MoTa: string;
  PhanTramGiam: string;
  HinhAnh: {
    DuongDan: string;
    ChiTiet: {
      MaHinhAnh: string;
      DuongDan: string;
    }[];
  };
  Size: string[];
  MauSac: string[];
}

export const getListProduct = async (
  page: number,
  tendanhmuc: string,
  tensanpham: string
) => {
  const data = await axiosClient.get<ListResponseProduct>("/index.php", {
    params: { page, tendanhmuc, tensanpham },
  });
  return data.data;
};

export const getDetailProduct = async (MaSanPham: string) => {
  const data = await axiosClient.get<DetailProduct>("/hinhanh.php", {
    params: { MaSanPham },
  });
  return data.data;
};

export const getListCategory = async () => {
  const data = await axiosClient.get<Category[]>("/danhmuc.php");
  return data.data;
};
